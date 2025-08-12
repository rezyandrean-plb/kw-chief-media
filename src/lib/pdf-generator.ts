import jsPDF from 'jspdf';

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
  issueDate: string;
  dueDate: string;
  notes: string;
  items: InvoiceItem[];
}

export function generateInvoicePDF(invoiceData: InvoiceData): jsPDF {
  const doc = new jsPDF();
  
  // Set font
  doc.setFont('helvetica');
  
  // Header
  doc.setFontSize(24);
  doc.setTextColor(39, 63, 79); // #273f4f
  doc.text('INVOICE', 20, 30);
  
  // Company info
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text('Chief Media Platform', 20, 45);
  doc.text('KW Singapore', 20, 52);
  doc.text('Email: info@chiefmedia.sg', 20, 59);
  
  // Invoice details
  doc.setFontSize(14);
  doc.setTextColor(39, 63, 79);
  doc.text('Invoice Details', 120, 45);
  
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Invoice Number: ${invoiceData.invoiceNumber}`, 120, 55);
  doc.text(`Issue Date: ${formatDate(invoiceData.issueDate)}`, 120, 62);
  doc.text(`Due Date: ${formatDate(invoiceData.dueDate)}`, 120, 69);
  
  // Client information
  doc.setFontSize(14);
  doc.setTextColor(39, 63, 79);
  doc.text('Bill To:', 20, 85);
  
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(invoiceData.clientName, 20, 95);
  doc.text(invoiceData.clientEmail, 20, 102);
  if (invoiceData.clientPhone) {
    doc.text(invoiceData.clientPhone, 20, 109);
  }
  if (invoiceData.clientAddress) {
    const addressLines = splitTextToFit(invoiceData.clientAddress, 60);
    addressLines.forEach((line, index) => {
      doc.text(line, 20, 116 + (index * 7));
    });
  }
  
  // Items table
  const startY = 140;
  const tableHeaders = ['Description', 'Qty', 'Rate', 'Amount'];

  const columnX = [20, 100, 120, 150];
  
  // Table header
  doc.setFontSize(12);
  doc.setTextColor(39, 63, 79);
  doc.setFillColor(248, 249, 250);
  doc.rect(20, startY - 5, 160, 10, 'F');
  
  tableHeaders.forEach((header, index) => {
    doc.text(header, columnX[index], startY);
  });
  
  // Table rows
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  
  let currentY = startY + 15;
  invoiceData.items.forEach((item) => {
    if (currentY > 250) {
      doc.addPage();
      currentY = 20;
    }
    
    const descriptionLines = splitTextToFit(item.description, 70);
    const maxLines = Math.max(descriptionLines.length, 1);
    
    descriptionLines.forEach((line, lineIndex) => {
      doc.text(line, columnX[0], currentY + (lineIndex * 5));
    });
    
    doc.text(item.quantity.toString(), columnX[1], currentY);
    doc.text(`$${item.rate.toFixed(2)}`, columnX[2], currentY);
    doc.text(`$${item.amount.toFixed(2)}`, columnX[3], currentY);
    
    currentY += maxLines * 5 + 5;
  });
  
  // Totals
  const subtotal = invoiceData.items.reduce((sum, item) => sum + item.amount, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;
  
  const totalsY = Math.max(currentY + 10, 220);
  
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('Subtotal:', 130, totalsY);
  doc.text(`$${subtotal.toFixed(2)}`, 170, totalsY);
  
  doc.text('Tax (10%):', 130, totalsY + 8);
  doc.text(`$${tax.toFixed(2)}`, 170, totalsY + 8);
  
  doc.setFontSize(12);
  doc.setTextColor(39, 63, 79);
  doc.setFont('helvetica', 'bold');
  doc.text('Total:', 130, totalsY + 20);
  doc.text(`$${total.toFixed(2)}`, 170, totalsY + 20);
  
  // Notes
  if (invoiceData.notes) {
    const notesY = totalsY + 40;
    doc.setFontSize(12);
    doc.setTextColor(39, 63, 79);
    doc.setFont('helvetica', 'normal');
    doc.text('Notes:', 20, notesY);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    const notesLines = splitTextToFit(invoiceData.notes, 80);
    notesLines.forEach((line, index) => {
      doc.text(line, 20, notesY + 10 + (index * 5));
    });
  }
  
  return doc;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function splitTextToFit(text: string, maxWidth: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';
  
  words.forEach(word => {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (testLine.length <= maxWidth) {
      currentLine = testLine;
    } else {
      if (currentLine) {
        lines.push(currentLine);
      }
      currentLine = word;
    }
  });
  
  if (currentLine) {
    lines.push(currentLine);
  }
  
  return lines;
}

export function downloadInvoicePDF(invoiceData: InvoiceData, filename?: string): void {
  const doc = generateInvoicePDF(invoiceData);
  const defaultFilename = `invoice-${invoiceData.invoiceNumber}.pdf`;
  doc.save(filename || defaultFilename);
}
