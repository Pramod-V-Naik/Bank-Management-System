import React from 'react';
import { DollarSign, Eye, TrendingUp, TrendingDown } from 'lucide-react';
import { User } from '../types';

interface BalanceCardProps {
  currentUser: User;
  onCreditClick: () => void;
  onDebitClick: () => void;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({
  currentUser,
  onCreditClick,
  onDebitClick
}) => {
  return (
    <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl shadow-xl p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <DollarSign className="w-6 h-6" />
          <h2 className="text-lg font-semibold">Current Balance</h2>
        </div>
        <Eye className="w-5 h-5 opacity-70" />
      </div>
      <div className="mb-6">
        <p className="text-3xl font-bold mb-2">${currentUser.balance.toLocaleString()}</p>
        <p className="text-green-100 text-sm">Available balance</p>
      </div>
      <div className="space-y-3">
        <button
          onClick={onCreditClick}
          className="w-full bg-white/20 hover:bg-white/30 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <TrendingUp className="w-4 h-4" />
          <span>Credit Money</span>
        </button>
        <button
          onClick={onDebitClick}
          className="w-full bg-white/20 hover:bg-white/30 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <TrendingDown className="w-4 h-4" />
          <span>Debit Money</span>
        </button>
      </div>
    </div>
  );
};