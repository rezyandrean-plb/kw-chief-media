import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json();

    if (!email || !code) {
      return NextResponse.json({ error: 'Email and code are required' }, { status: 400 });
    }

    // Allow KW Singapore realtors and Property Lim Brothers users
    const allowedDomains = ['@kwsingapore.com', '@propertylimbrothers.com'];
    const isAllowedDomain = allowedDomains.some(domain => email.endsWith(domain));
    
    if (!isAllowedDomain) {
      return NextResponse.json({ 
        error: 'Email verification is only available for KW Singapore realtors and Property Lim Brothers users' 
      }, { status: 403 });
    }

    // Get stored verification data from global storage
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const verificationCodes = (global as any).verificationCodes as Map<string, { code: string; expiresAt: number }>;
    
    if (!verificationCodes) {
      return NextResponse.json({ error: 'Verification system not available' }, { status: 500 });
    }

    const storedData = verificationCodes.get(email);
    
    if (!storedData) {
      return NextResponse.json({ error: 'No verification code found for this email' }, { status: 400 });
    }

    // Check if code has expired
    if (Date.now() > storedData.expiresAt) {
      verificationCodes.delete(email);
      return NextResponse.json({ error: 'Verification code has expired' }, { status: 400 });
    }

    // Verify the code
    if (storedData.code !== code) {
      return NextResponse.json({ error: 'Invalid verification code' }, { status: 400 });
    }

    // Code is valid - remove it from storage
    verificationCodes.delete(email);

    // Determine company name based on email domain
    let company = 'KW Singapore';
    if (email.endsWith('@propertylimbrothers.com')) {
      company = 'Property Lim Brothers';
    }

    // Create user data
    const user = {
      id: `kw_${Date.now()}`,
      email,
      name: email.split('@')[0],
      role: 'realtor' as const,
      company,
    };

    // In a real application, you would create a session or JWT token here
    // For now, we'll return the user data
    return NextResponse.json({ 
      success: true, 
      user,
      message: 'Authentication successful' 
    });

  } catch (error) {
    console.error('Error verifying code:', error);
    return NextResponse.json({ 
      error: 'Failed to verify code' 
    }, { status: 500 });
  }
} 