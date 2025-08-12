import sgMail from '@sendgrid/mail';

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export interface EmailTemplate {
  to: string;
  subject: string;
  html: string;
}

export function createVerificationEmail(to: string, code: string): EmailTemplate {
  return {
    to,
    subject: 'Your KW Singapore Verification Code',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #03809c 0%, #273f4f 100%); padding: 30px; border-radius: 10px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">KW Singapore</h1>
          <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Chief Media Platform</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #273f4f; margin: 0 0 20px 0;">Your Verification Code</h2>
          
          <p style="color: #666; margin: 0 0 20px 0; line-height: 1.6;">
            Hello! You've requested to sign in to the Chief Media Platform using your KW Singapore email.
          </p>
          
          <div style="background: #f8f9fa; border: 2px dashed #03809c; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center;">
            <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">Your verification code is:</p>
            <div style="font-size: 32px; font-weight: bold; color: #03809c; letter-spacing: 8px; font-family: monospace;">
              ${code}
            </div>
          </div>
          
          <p style="color: #666; margin: 20px 0; line-height: 1.6;">
            This code will expire in 10 minutes. If you didn't request this code, please ignore this email.
          </p>
          
          <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px;">
            <p style="color: #999; font-size: 12px; margin: 0;">
              This is an automated message from Chief Media Platform. Please do not reply to this email.
            </p>
          </div>
        </div>
      </div>
    `,
  };
}

export async function sendEmail(template: EmailTemplate): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY) {
    console.warn('SendGrid API key not configured');
    return false;
  }

  try {
    const msg = {
      ...template,
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@chiefmedia.sg',
    };

    await sgMail.send(msg);
    return true;
  } catch (error) {
    console.error('SendGrid error:', error);
    return false;
  }
}

export function isSendGridConfigured(): boolean {
  return !!process.env.SENDGRID_API_KEY;
} 