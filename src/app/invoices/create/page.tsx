'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import AnimatedBackground from '../../../components/AnimatedBackground';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export default function CreateInvoicePage() {
  const { } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

    try {
      // Simulate API call to save invoice
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to invoices list
      router.push('/invoices');
    } catch (error) {
      console.error('Error creating invoice:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#273f4f] relative overflow-hidden">
      <AnimatedBackground />
      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8 relative z-10">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Create New Invoice
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Fill in the details below to create a new invoice.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Invoice Header */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Invoice Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Invoice Number
                  </label>
                  <input
                    type="text"
                    value={invoiceData.invoiceNumber}
                    onChange={(e) => setInvoiceData({...invoiceData, invoiceNumber: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="INV-001"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Issue Date
                  </label>
                  <input
                    type="date"
                    value={invoiceData.issueDate}
                    onChange={(e) => setInvoiceData({...invoiceData, issueDate: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={invoiceData.dueDate}
                    onChange={(e) => setInvoiceData({...invoiceData, dueDate: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Client Information */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Client Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={invoiceData.clientName}
                    onChange={(e) => setInvoiceData({...invoiceData, clientName: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter client name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Client Email
                  </label>
                  <input
                    type="email"
                    value={invoiceData.clientEmail}
                    onChange={(e) => setInvoiceData({...invoiceData, clientEmail: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="client@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Client Phone
                  </label>
                  <input
                    type="tel"
                    value={invoiceData.clientPhone}
                    onChange={(e) => setInvoiceData({...invoiceData, clientPhone: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Client Address
                  </label>
                  <textarea
                    value={invoiceData.clientAddress}
                    onChange={(e) => setInvoiceData({...invoiceData, clientAddress: e.target.value})}
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter client address"
                  />
                </div>
              </div>
            </div>

            {/* Invoice Items */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Invoice Items
                </h2>
                <button
                  type="button"
                  onClick={addItem}
                  className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <PlusIcon className="h-4 w-4 mr-1" />
                  Add Item
                </button>
              </div>

              {invoiceData.items.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  No items added yet. Click &quot;Add Item&quot; to get started.
                </p>
              ) : (
                <div className="space-y-4">
                  {invoiceData.items.map((item) => (
                    <div key={item.id} className="grid grid-cols-12 gap-4 items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                      <div className="col-span-5">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                          className="block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Item description"
                          required
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                          className="block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                          className="block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                          className="block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-600"
                        />
                      </div>
                      <div className="col-span-1">
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Invoice Summary */}
            {invoiceData.items.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Invoice Summary
                </h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                    <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Tax (10%):</span>
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
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Additional Notes
              </h2>
              <textarea
                value={invoiceData.notes}
                onChange={(e) => setInvoiceData({...invoiceData, notes: e.target.value})}
                rows={4}
                className="block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Add any additional notes or terms..."
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || invoiceData.items.length === 0}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Creating...' : 'Create Invoice'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 