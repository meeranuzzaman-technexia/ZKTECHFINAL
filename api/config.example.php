<?php

// Copy this file to config.php and replace the placeholder SMTP values.
return [
    'smtp_host' => 'smtp.your-provider.com',
    'smtp_port' => 587,
    'smtp_username' => 'support@zktechsolutions.org',
    'smtp_password' => 'REPLACE_WITH_SMTP_PASSWORD_OR_APP_PASSWORD',
    'smtp_secure' => 'tls', // Use "ssl" with port 465, or "tls" with port 587.

    'from_email' => 'support@zktechsolutions.org',
    'from_name' => 'ZK Tech Solutions Website',
    'to_email' => 'support@zktechsolutions.org',
    'to_name' => 'ZK Tech Solutions',

    // Optional: add one or more CC recipients, or leave empty to disable CC.
    'cc_emails' => [],
];
