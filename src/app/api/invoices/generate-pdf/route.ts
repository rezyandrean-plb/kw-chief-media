import { NextRequest, NextResponse } from 'next/server';
import { generateInvoicePDF, InvoiceData } from '@/lib/pdf-generator';

export async function POST(request: NextRequest) {
  try {
    const invoiceData: InvoiceData = await request.json();

    // Validate required fields
    if (!invoiceData.invoiceNumber || !invoiceData.clientName || !invoiceData.clientEmail) {
      return NextResponse.json({ error: 'Missing required invoice data' }, { status: 400 });
    }

    // Generate PDF
    const doc = generateInvoicePDF(invoiceData);
    
    // Convert to base64 for sending
    const pdfBytes = doc.output('arraybuffer');
    const pdfBase64 = Buffer.from(pdfBytes).toString('base64');

    return NextResponse.json({ 
      success: true, 
      pdfBase64,
      filename: `invoice-${invoiceData.invoiceNumber}.pdf`
    });

  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json({ 
      error: 'Failed to generate PDF' 
    }, { status: 500 });
  }
}
