import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/sendgrid';
import { createInvoiceEmailTemplate } from '@/lib/invoice-email';

export async function POST(request: NextRequest) {
  try {
    const { invoiceData } = await request.json();

    // Validate required fields
    if (!invoiceData.invoiceNumber || !invoiceData.clientName || !invoiceData.clientEmail) {
      return NextResponse.json({ error: 'Missing required invoice data' }, { status: 400 });
    }

    // Create email template
    const emailTemplate = createInvoiceEmailTemplate(invoiceData);

    // Send email
    const emailSent = await sendEmail(emailTemplate);
    
    if (emailSent) {
      return NextResponse.json({ 
        success: true, 
        message: 'Invoice email sent successfully' 
      });
    } else {
      return NextResponse.json({ 
        error: 'Failed to send email' 
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Error sending invoice email:', error);
    return NextResponse.json({ 
      error: 'Failed to send invoice email' 
    }, { status: 500 });
  }
}
