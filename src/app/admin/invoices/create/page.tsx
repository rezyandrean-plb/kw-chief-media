'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { PlusIcon, TrashIcon, ArrowLeftIcon, DocumentArrowDownIcon, EnvelopeIcon, CheckIcon } from '@heroicons/react/24/outline';
import AnimatedBackground from '../../../../components/AnimatedBackground';
import AdminSidebar from '../../../../components/AdminSidebar';
import { downloadInvoicePDF, InvoiceData } from '@/lib/pdf-generator';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export default function CreateInvoicePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientAddress: '',
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    notes: '',
    items: [] as InvoiceItem[],
  });

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      rate: 0,
      amount: 0,
    };
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, newItem],
    });
  };

  const removeItem = (id: string) => {
    setInvoiceData({
      ...invoiceData,
      items: invoiceData.items.filter(item => item.id !== id),
    });
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    const updatedItems = invoiceData.items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'rate') {
          updatedItem.amount = updatedItem.quantity * updatedItem.rate;
        }
        return updatedItem;
      }
      return item;
    });
    setInvoiceData({ ...invoiceData, items: updatedItems });
  };

  const calculateSubtotal = () => {
    return invoiceData.items.reduce((sum, item) => sum + item.amount, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.1; // 10% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    if (!invoiceData.invoiceNumber.trim()) {
      alert('Please enter an invoice number');
      return;
    }
    
    if (!invoiceData.clientName.trim()) {
      alert('Please enter a client name');
      return;
    }
    
    if (!invoiceData.clientEmail.trim()) {
      alert('Please enter a client email');
      return;
    }
    
    if (invoiceData.items.length === 0) {
      alert('Please add at least one item to the invoice');
      return;
    }
    
    setLoading(true);

    try {
      // Simulate API call to save invoice
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success modal instead of redirecting
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error creating invoice:', error);
      alert('Failed to create invoice. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = () => {
    try {
      downloadInvoicePDF(invoiceData as InvoiceData);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Failed to export PDF. Please try again.');
    }
  };

  const handleSendEmail = async () => {
    setEmailLoading(true);
    setEmailSuccess(false);

    try {
      const response = await fetch('/api/invoices/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ invoiceData }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setEmailSuccess(true);
        setTimeout(() => setEmailSuccess(false), 3000);
      } else {
        throw new Error(data.error || 'Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email. Please try again.');
    } finally {
      setEmailLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setEmailSuccess(false);
    router.push('/admin/invoices');
  };

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
        <AnimatedBackground />
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 relative z-10"></div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="flex relative z-10">
        <AdminSidebar />

        <div className="flex-1 flex flex-col min-h-screen lg:ml-64">
          <div className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-semibold text-[#273f4f]">
                    Create Invoice
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Welcome, {user?.name}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => router.push('/admin/invoices')}
                    className="text-sm text-[#B40101] hover:text-[#e0651a] transition flex items-center space-x-2"
                  >
                    <ArrowLeftIcon className="h-4 w-4" />
                    <span>Back to Invoices</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#273f4f]">
                  Create New Invoice
                </h1>
                <p className="mt-2 text-[#273f4f]/80">
                  Fill in the details below to create a new invoice.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Invoice Header */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Invoice Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Invoice Number
                      </label>
                      <input
                        type="text"
                        value={invoiceData.invoiceNumber}
                        onChange={(e) => setInvoiceData({...invoiceData, invoiceNumber: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-3 text-gray-900 bg-white focus:outline-none focus:ring-[#B40101] focus:border-[#B40101]"
                        placeholder="INV-001"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Issue Date
                      </label>
                      <input
                        type="date"
                        value={invoiceData.issueDate}
                        onChange={(e) => setInvoiceData({...invoiceData, issueDate: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-3 text-gray-900 bg-white focus:outline-none focus:ring-[#B40101] focus:border-[#B40101]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Due Date
                      </label>
                      <input
                        type="date"
                        value={invoiceData.dueDate}
                        onChange={(e) => setInvoiceData({...invoiceData, dueDate: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-3 text-gray-900 bg-white focus:outline-none focus:ring-[#B40101] focus:border-[#B40101]"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Client Information */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Client Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Client Name
                      </label>
                      <input
                        type="text"
                        value={invoiceData.clientName}
                        onChange={(e) => setInvoiceData({...invoiceData, clientName: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-3 text-gray-900 bg-white focus:outline-none focus:ring-[#B40101] focus:border-[#B40101]"
                        placeholder="Enter client name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Client Email
                      </label>
                      <input
                        type="email"
                        value={invoiceData.clientEmail}
                        onChange={(e) => setInvoiceData({...invoiceData, clientEmail: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-3 text-gray-900 bg-white focus:outline-none focus:ring-[#B40101] focus:border-[#B40101]"
                        placeholder="client@example.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Client Phone
                      </label>
                      <input
                        type="tel"
                        value={invoiceData.clientPhone}
                        onChange={(e) => setInvoiceData({...invoiceData, clientPhone: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-3 text-gray-900 bg-white focus:outline-none focus:ring-[#B40101] focus:border-[#B40101]"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Client Address
                      </label>
                      <textarea
                        value={invoiceData.clientAddress}
                        onChange={(e) => setInvoiceData({...invoiceData, clientAddress: e.target.value})}
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-3 text-gray-900 bg-white focus:outline-none focus:ring-[#B40101] focus:border-[#B40101]"
                        placeholder="Enter client address"
                      />
                    </div>
                  </div>
                </div>

                {/* Invoice Items */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Invoice Items
                    </h2>
                    <button
                      type="button"
                      onClick={addItem}
                      className="flex items-center px-3 py-2 bg-[#B40101] text-white rounded-md hover:bg-[#e0651a] transition-colors"
                    >
                      <PlusIcon className="h-4 w-4 mr-1" />
                      Add Item
                    </button>
                  </div>

                  {invoiceData.items.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                      No items added yet. Click &quot;Add Item&quot; to get started.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {invoiceData.items.map((item) => (
                        <div key={item.id} className="grid grid-cols-12 gap-4 items-center p-4 border border-gray-200 rounded-lg">
                          <div className="col-span-5">
                            <input
                              type="text"
                              value={item.description}
                              onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                              className="block w-full border border-gray-300 rounded-md px-3 py-3 text-gray-900 bg-white focus:outline-none focus:ring-[#B40101] focus:border-[#B40101]"
                              placeholder="Item description"
                              required
                            />
                          </div>
                          <div className="col-span-2">
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                              className="block w-full border border-gray-300 rounded-md px-3 py-3 text-gray-900 bg-white focus:outline-none focus:ring-[#B40101] focus:border-[#B40101]"
                              placeholder="Qty"
                              min="1"
                              required
                            />
                          </div>
                          <div className="col-span-2">
                            <input
                              type="number"
                              value={item.rate}
                              onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                              className="block w-full border border-gray-300 rounded-md px-3 py-3 text-gray-900 bg-white focus:outline-none focus:ring-[#B40101] focus:border-[#B40101]"
                              placeholder="Rate"
                              min="0"
                              step="0.01"
                              required
                            />
                          </div>
                          <div className="col-span-2">
                            <input
                              type="number"
                              value={item.amount}
                              readOnly
                              className="block w-full border border-gray-300 rounded-md px-3 py-3 text-gray-900 bg-gray-50"
                            />
                          </div>
                          <div className="col-span-1">
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Invoice Summary */}
                {invoiceData.items.length > 0 && (
                  <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Invoice Summary
                    </h2>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax (10%):</span>
                        <span className="font-medium">${calculateTax().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-lg font-semibold border-t pt-2">
                        <span>Total:</span>
                        <span>${calculateTotal().toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notes */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Additional Notes
                  </h2>
                  <textarea
                    value={invoiceData.notes}
                    onChange={(e) => setInvoiceData({...invoiceData, notes: e.target.value})}
                    rows={4}
                    className="block w-full border border-gray-300 rounded-md px-3 py-3 text-gray-900 bg-white focus:outline-none focus:ring-[#B40101] focus:border-[#B40101]"
                    placeholder="Add any additional notes or terms..."
                  />
                </div>

                {/* Submit Buttons */}
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => router.push('/admin/invoices')}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading || invoiceData.items.length === 0}
                    className="px-6 py-3 bg-[#B40101] text-white rounded-md hover:bg-[#e0651a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                  >
                    {loading ? 'Creating...' : 'Create Invoice'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <CheckIcon className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Invoice Created Successfully!
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Your invoice has been created. What would you like to do next?
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={handleExportPDF}
                  className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-[#B40101] hover:bg-[#e0651a] transition-colors"
                >
                  <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
                  Export PDF
                </button>
                
                <button
                  onClick={handleSendEmail}
                  disabled={emailLoading}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {emailLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                  ) : (
                    <EnvelopeIcon className="h-4 w-4 mr-2" />
                  )}
                  {emailLoading ? 'Sending...' : 'Send Email'}
                </button>

                {emailSuccess && (
                  <div className="flex items-center justify-center text-sm text-green-600">
                    <CheckIcon className="h-4 w-4 mr-1" />
                    Email sent successfully!
                  </div>
                )}
                
                <button
                  onClick={handleCloseModal}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  Back to Invoices
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 