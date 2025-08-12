import { NextRequest, NextResponse } from 'next/server';
import { createVerificationEmail, sendEmail } from '@/lib/sendgrid';

// In-memory storage for verification codes (in production, use a database)
// This should be moved to a shared module in production
const verificationCodes = new Map<string, { code: string; expiresAt: number }>();

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Allow KW Singapore realtors and Property Lim Brothers users to use email verification
    const allowedDomains = ['@kwsingapore.com', '@propertylimbrothers.com'];
    const isAllowedDomain = allowedDomains.some(domain => email.endsWith(domain));
    
    if (!isAllowedDomain) {
      return NextResponse.json({ 
        error: 'Email verification is only available for KW Singapore realtors and Property Lim Brothers users' 
      }, { status: 403 });
    }

    // Generate a 6-digit verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Set expiration time (10 minutes from now)
    const expiresAt = Date.now() + 10 * 60 * 1000;
    
    // Store the code
    verificationCodes.set(email, { code, expiresAt });

    // Send email via SendGrid
    const emailTemplate = createVerificationEmail(email, code);
    const emailSent = await sendEmail(emailTemplate);
    
    if (emailSent) {
      console.log(`Verification code sent to ${email}: ${code}`);
    } else {
      // Fallback to console logging for development
      console.log(`Verification code for ${email}: ${code}`);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Verification code sent to your email' 
    });

  } catch (error) {
    console.error('Error sending verification code:', error);
    return NextResponse.json({ 
      error: 'Failed to send verification code' 
    }, { status: 500 });
  }
}

// For development only - in production, use a proper database
// This is a workaround to share the verification codes between routes
if (typeof global !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (global as any).verificationCodes = verificationCodes;
} 