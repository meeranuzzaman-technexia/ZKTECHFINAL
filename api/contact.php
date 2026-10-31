<?php

declare(strict_types=1);

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond($statusCode, $payload)
{
    http_response_code($statusCode);
    echo json_encode($payload);
    exit;
}

function cleanLine($value)
{
    return trim(str_replace(["\r", "\n"], ' ', (string) $value));
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['success' => false, 'message' => 'Only POST requests are allowed.']);
}

$rawBody = file_get_contents('php://input');
$data = json_decode($rawBody ?: '', true);
if (!is_array($data)) {
    $data = $_POST;
}

// Honeypot: return a normal response to bots without sending an email.
if (cleanLine($data['company'] ?? '') !== '') {
    respond(200, ['success' => true]);
}

$name = cleanLine($data['name'] ?? '');
$email = cleanLine($data['email'] ?? '');
$website = cleanLine($data['website'] ?? '');
$message = trim((string) ($data['message'] ?? ''));

if (strlen($name) < 2 || strlen($name) > 120) {
    respond(422, ['success' => false, 'message' => 'Please enter a valid name.']);
}

if (strlen($email) > 190 || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, ['success' => false, 'message' => 'Please enter a valid email address.']);
}

if (strlen($website) > 255) {
    respond(422, ['success' => false, 'message' => 'The website address is too long.']);
}

if (strlen($message) > 5000) {
    respond(422, ['success' => false, 'message' => 'Your comment is too long.']);
}

$config = [
    'smtp_host' => getenv('SMTP_HOST') ?: '',
    'smtp_port' => (int) (getenv('SMTP_PORT') ?: 587),
    'smtp_username' => getenv('SMTP_USERNAME') ?: '',
    'smtp_password' => getenv('SMTP_PASSWORD') ?: '',
    'smtp_secure' => getenv('SMTP_SECURE') ?: 'tls',
    'from_email' => getenv('MAIL_FROM_ADDRESS') ?: 'support@zktechsolutions.org',
    'from_name' => getenv('MAIL_FROM_NAME') ?: 'ZK Tech Solutions Website',
    'to_email' => getenv('MAIL_TO_ADDRESS') ?: 'support@zktechsolutions.org',
    'to_name' => getenv('MAIL_TO_NAME') ?: 'ZK Tech Solutions',
    'cc_emails' => array_filter(array_map('trim', explode(',', getenv('MAIL_CC_ADDRESSES') ?: ''))),
];

$localConfigPath = __DIR__ . '/config.php';
if (is_file($localConfigPath)) {
    $localConfig = require $localConfigPath;
    if (is_array($localConfig)) {
        $config = array_merge($config, $localConfig);
    }
}

$autoloadPath = __DIR__ . '/../vendor/autoload.php';
if (!is_file($autoloadPath)) {
    error_log('PHPMailer autoloader not found. Run composer install.');
    respond(500, ['success' => false, 'message' => 'The email service is not configured yet.']);
}

require $autoloadPath;

if (
    $config['smtp_host'] === '' ||
    $config['smtp_username'] === '' ||
    $config['smtp_password'] === '' ||
    strpos($config['smtp_host'], 'your-provider.com') !== false ||
    strpos($config['smtp_password'], 'REPLACE_WITH_') === 0
) {
    error_log('SMTP configuration is incomplete.');
    respond(500, ['success' => false, 'message' => 'The email service is not configured yet.']);
}

if (!is_array($config['cc_emails'])) {
    $config['cc_emails'] = [];
}

$config['cc_emails'] = array_values(array_unique(array_filter(array_map('trim', $config['cc_emails']))));
foreach ($config['cc_emails'] as $ccEmail) {
    if (!filter_var($ccEmail, FILTER_VALIDATE_EMAIL)) {
        error_log('A configured CC email address is invalid: ' . $ccEmail);
        respond(500, ['success' => false, 'message' => 'The email service is not configured yet.']);
    }
}

$safeName = htmlspecialchars($name, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$safeEmail = htmlspecialchars($email, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$safeWebsite = htmlspecialchars($website !== '' ? $website : 'Not provided', ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$safeMessage = nl2br(htmlspecialchars($message !== '' ? $message : 'No comment provided.', ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'));

$mail = null;

try {
    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->Timeout = 20;
    $mail->isSMTP();
    $mail->Host = $config['smtp_host'];
    $mail->SMTPAuth = true;
    $mail->Username = $config['smtp_username'];
    $mail->Password = $config['smtp_password'];
    $mail->Port = (int) $config['smtp_port'];

    $secure = strtolower((string) $config['smtp_secure']);
    if ($secure === 'ssl') {
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    } elseif ($secure === 'tls') {
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    }

    $mail->setFrom($config['from_email'], $config['from_name']);
    $mail->addAddress($config['to_email'], $config['to_name']);
    foreach ($config['cc_emails'] as $ccEmail) {
        $mail->addCC($ccEmail);
    }
    $mail->addReplyTo($email, $name);
    $mail->isHTML(true);
    $mail->Subject = 'New ZK Tech website enquiry - ' . $name;
    $mail->Body =
        '<h2>New website enquiry</h2>' .
        '<p><strong>Name:</strong> ' . $safeName . '</p>' .
        '<p><strong>Email:</strong> ' . $safeEmail . '</p>' .
        '<p><strong>Website:</strong> ' . $safeWebsite . '</p>' .
        '<p><strong>Comment:</strong><br>' . $safeMessage . '</p>';
    $mail->AltBody =
        "New website enquiry\n\n" .
        "Name: {$name}\n" .
        "Email: {$email}\n" .
        "Website: " . ($website !== '' ? $website : 'Not provided') . "\n\n" .
        "Comment:\n" . ($message !== '' ? $message : 'No comment provided.');

    $mail->send();
    respond(200, ['success' => true, 'message' => 'Message sent successfully.']);
} catch (Exception $exception) {
    error_log('Contact form mail error: ' . ($mail ? $mail->ErrorInfo : $exception->getMessage()));
    respond(500, [
        'success' => false,
        'message' => 'Your message could not be sent right now. Please try again later.',
    ]);
}
