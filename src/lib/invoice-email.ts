import { InvoiceData } from './pdf-generator';

export function createInvoiceEmailTemplate(invoiceData: InvoiceData): {
  to: string;
  subject: string;
  html: string;
} {
  const subtotal = invoiceData.items.reduce((sum, item) => sum + item.amount, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return {
    to: invoiceData.clientEmail,
    subject: `Invoice ${invoiceData.invoiceNumber} from Chief Media Platform`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #03809c 0%, #273f4f 100%); padding: 30px; border-radius: 10px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Chief Media Platform</h1>
          <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">KW Singapore</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #273f4f; margin: 0 0 20px 0;">Invoice ${invoiceData.invoiceNumber}</h2>
          
          <div style="margin-bottom: 30px;">
            <p style="color: #666; margin: 0 0 10px 0; font-weight: bold;">Bill To:</p>
            <p style="color: #333; margin: 0 0 5px 0;">${invoiceData.clientName}</p>
            <p style="color: #666; margin: 0 0 5px 0;">${invoiceData.clientEmail}</p>
            ${invoiceData.clientPhone ? `<p style="color: #666; margin: 0 0 5px 0;">${invoiceData.clientPhone}</p>` : ''}
            ${invoiceData.clientAddress ? `<p style="color: #666; margin: 0 0 5px 0;">${invoiceData.clientAddress}</p>` : ''}
          </div>

          <div style="margin-bottom: 30px;">
            <p style="color: #666; margin: 0 0 10px 0; font-weight: bold;">Invoice Details:</p>
            <p style="color: #333; margin: 0 0 5px 0;">Issue Date: ${formatDate(invoiceData.issueDate)}</p>
            <p style="color: #333; margin: 0 0 5px 0;">Due Date: ${formatDate(invoiceData.dueDate)}</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
            <thead>
              <tr style="background-color: #f8f9fa;">
                <th style="padding: 12px; text-align: left; border-bottom: 2px solid #dee2e6; color: #273f4f;">Description</th>
                <th style="padding: 12px; text-align: center; border-bottom: 2px solid #dee2e6; color: #273f4f;">Qty</th>
                <th style="padding: 12px; text-align: right; border-bottom: 2px solid #dee2e6; color: #273f4f;">Rate</th>
                <th style="padding: 12px; text-align: right; border-bottom: 2px solid #dee2e6; color: #273f4f;">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${invoiceData.items.map(item => `
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #dee2e6; color: #333;">${item.description}</td>
                  <td style="padding: 12px; text-align: center; border-bottom: 1px solid #dee2e6; color: #333;">${item.quantity}</td>
                  <td style="padding: 12px; text-align: right; border-bottom: 1px solid #dee2e6; color: #333;">$${item.rate.toFixed(2)}</td>
                  <td style="padding: 12px; text-align: right; border-bottom: 1px solid #dee2e6; color: #333;">$${item.amount.toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div style="text-align: right; margin-bottom: 30px;">
            <div style="margin-bottom: 10px;">
              <span style="color: #666; margin-right: 20px;">Subtotal:</span>
              <span style="color: #333; font-weight: bold;">$${subtotal.toFixed(2)}</span>
            </div>
            <div style="margin-bottom: 10px;">
              <span style="color: #666; margin-right: 20px;">Tax (10%):</span>
              <span style="color: #333; font-weight: bold;">$${tax.toFixed(2)}</span>
            </div>
            <div style="border-top: 2px solid #dee2e6; padding-top: 10px;">
              <span style="color: #273f4f; font-weight: bold; font-size: 18px; margin-right: 20px;">Total:</span>
              <span style="color: #273f4f; font-weight: bold; font-size: 18px;">$${total.toFixed(2)}</span>
            </div>
          </div>

          ${invoiceData.notes ? `
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
              <p style="color: #273f4f; font-weight: bold; margin: 0 0 10px 0;">Notes:</p>
              <p style="color: #666; margin: 0; line-height: 1.6;">${invoiceData.notes}</p>
            </div>
          ` : ''}

          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center;">
            <p style="color: #666; margin: 0 0 15px 0; font-weight: bold;">Payment Instructions</p>
            <p style="color: #666; margin: 0; line-height: 1.6;">
              Please make payment by the due date. For payment inquiries, please contact us at info@chiefmedia.sg
            </p>
          </div>
          
          <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px; text-align: center;">
            <p style="color: #999; font-size: 12px; margin: 0;">
              This invoice was generated by Chief Media Platform. For any questions, please contact us at info@chiefmedia.sg
            </p>
          </div>
        </div>
      </div>
    `,
  };
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
