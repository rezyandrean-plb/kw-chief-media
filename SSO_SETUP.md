# Email Code Authentication Setup Guide for KW Singapore Realtors and Property Lim Brothers Users

This guide explains how to set up email code authentication for KW Singapore realtors and Property Lim Brothers users, replacing the previous Google OAuth SSO system.

## Prerequisites

1. An email service provider (e.g., SendGrid, AWS SES, or Nodemailer)
2. Access to configure email sending capabilities
3. A domain-verified email system for @kwsingapore.com and @propertylimbrothers.com emails

## Setup Steps

### 1. Configure SendGrid

1. **Create a SendGrid Account**
   - Go to [SendGrid](https://sendgrid.com/) and create an account
   - Verify your email address

2. **Create an API Key**
   - Navigate to Settings > API Keys
   - Click "Create API Key"
   - Choose "Restricted Access" and select "Mail Send" permissions
   - Copy the generated API key

3. **Verify Your Sender Domain**
   - Go to Settings > Sender Authentication
   - Choose "Domain Authentication" (recommended) or "Single Sender Verification"
   - Follow the DNS configuration steps for your domain
   - For development, you can use Single Sender Verification with your email

4. **Install SendGrid Package**
   ```bash
   bun add @sendgrid/mail
   ```

### 2. Environment Configuration

Create a `.env.local` file in your project root with the following variables:

```env
# SendGrid Configuration
SENDGRID_API_KEY=your-sendgrid-api-key-here
SENDGRID_FROM_EMAIL=noreply@chiefmedia.sg

# Application Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-here
```

### 3. Generate NextAuth Secret

Generate a secure random string for NEXTAUTH_SECRET:

```bash
openssl rand -base64 32
```

## Security Features

### Domain Restriction
- Only users with @kwsingapore.com or @propertylimbrothers.com email addresses can use email code authentication
- Admin users (isabelle@chiefmedia.sg) use traditional password authentication
- All other email domains use traditional password authentication

### Role Assignment
- @kwsingapore.com and @propertylimbrothers.com users are automatically assigned the "realtor" role
- Admin users are assigned the "admin" role
- Other users are assigned the "client" role

### Code Security
- Verification codes are 6-digit numbers
- Codes expire after 10 minutes
- Codes are single-use and deleted after verification
- Codes are stored securely in memory (in production, use a database)

### SendGrid Best Practices
- Use domain authentication for better deliverability
- Monitor your SendGrid dashboard for delivery rates
- Set up webhook notifications for email events
- Implement rate limiting to prevent abuse
- Use dedicated IP addresses for high-volume sending
- Regularly review and clean your email lists

## Testing

1. Start the development server: `bun dev`
2. Navigate to `/login`
3. Enter a @kwsingapore.com or @propertylimbrothers.com email address
4. Click "Send Verification Code"
5. Check the console for the verification code (in production, this would be sent via email)
6. Enter the code and click "Verify Code"
7. Verify that the user is redirected to `/vendors` after successful authentication

## Production Deployment

1. Configure a production email service (SendGrid, AWS SES, etc.)
2. Set the production email credentials in your environment variables
3. Ensure your domain is properly configured for email sending
4. Test the email code authentication flow with real @kwsingapore.com and @propertylimbrothers.com accounts
5. Consider implementing rate limiting for code sending
6. Set up proper logging and monitoring for authentication attempts

## Troubleshooting

### Common Issues

1. **"Email verification is only available for KW Singapore realtors and Property Lim Brothers users" error**
   - Verify the user's email ends with @kwsingapore.com or @propertylimbrothers.com
   - Check that the email domain is correctly configured

2. **"Verification code has expired" error**
   - Codes expire after 10 minutes
   - Request a new code by clicking "Resend code"

3. **"Invalid verification code" error**
   - Ensure the 6-digit code is entered correctly
   - Check that the code hasn't been used already

4. **Email not received**
   - Check spam/junk folders
   - Verify SendGrid API key is correct
   - Check SendGrid dashboard for delivery status
   - Verify sender domain authentication
   - Check console logs for development testing

5. **SendGrid API errors**
   - Verify API key has "Mail Send" permissions
   - Check SendGrid account status and limits
   - Ensure sender email is verified
   - Check API key is not expired or revoked

### Support

For technical support, contact the development team with:
- Error messages
- Browser console logs
- Steps to reproduce the issue 