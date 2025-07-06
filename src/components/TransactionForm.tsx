import React from 'react';
import { TransactionForm as TransactionFormType } from '../types';

interface TransactionFormProps {
  transactionForm: TransactionFormType;
  setTransactionForm: (form: TransactionFormType) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({
  transactionForm,
  setTransactionForm,
  onSubmit,
  onCancel,
  isLoading
}) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">
          {transactionForm.type === 'credit' ? 'Credit Money' : 'Debit Money'}
        </h2>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-white transition-colors text-2xl"
        >
          ×
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-blue-100 mb-2">
            Amount
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={transactionForm.amount}
            onChange={(e) => setTransactionForm({ ...transactionForm, amount: e.target.value })}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
            placeholder="Enter amount"
            required
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading || !transactionForm.amount || parseFloat(transactionForm.amount) <= 0}
            className={`flex-1 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
              transactionForm.type === 'credit'
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Processing...
              </div>
            ) : (
              `${transactionForm.type === 'credit' ? 'Credit' : 'Debit'} $${transactionForm.amount || '0'}`
            )}
          </button>
        </div>
      </form>
    </div>
  );
};