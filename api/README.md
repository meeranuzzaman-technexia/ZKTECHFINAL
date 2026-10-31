# Contact form / PHPMailer setup

The React form posts JSON to `POST /api/contact.php`. The endpoint sends the enquiry to `support@zktechsolutions.org` and sets the visitor as Reply-To.

## 1. Install PHPMailer

PHP 7.4+ and Composer are required:

```bash
composer install
```

## 2. Configure SMTP

```bash
cp api/config.example.php api/config.php
```

Edit `api/config.php` with the SMTP host, mailbox username and password/app password supplied by the email provider. Port `587` normally uses `tls`; port `465` normally uses `ssl`. Never commit `api/config.php`.

To send copies to CC, add addresses to the `cc_emails` array. Leave it empty to disable CC. The `MAIL_CC_ADDRESSES` environment variable also accepts a comma-separated list.

Environment variables can be used instead: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USERNAME`, `SMTP_PASSWORD`, `SMTP_SECURE`, `MAIL_FROM_ADDRESS`, `MAIL_FROM_NAME`, `MAIL_TO_ADDRESS`, `MAIL_TO_NAME`, and `MAIL_CC_ADDRESSES`.

## 3. Local development

Start PHP from the repository root:

```bash
php -S 127.0.0.1:8000 -t .
```

Then start Vite normally. Its `/api` proxy forwards requests to port `8000`.

## 4. Production deployment

Use hosting that runs PHP. Deploy the **contents** of `dist/`, plus the `api/` directory and Composer's `vendor/` directory, into the web root so these URLs exist:

- `/index.html` and the Vite assets
- `/api/contact.php`
- `/vendor/autoload.php`

Add the production `api/config.php` separately. Static-only hosting cannot execute this PHPMailer endpoint; in that case, host the API separately and update the frontend endpoint to its public URL.
