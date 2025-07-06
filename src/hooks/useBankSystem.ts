import { useState } from 'react';
import { User, Transaction, LoginForm, TransactionForm } from '../types';
import { initialUsers } from '../data/users';

export const useBankSystem = () => {
  const [users] = useState<User[]>(initialUsers);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState<LoginForm>({ name: '', accno: '' });
  const [transactionForm, setTransactionForm] = useState<TransactionForm>({ 
    amount: '', 
    type: 'credit' 
  });
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const showMessage = (message: string, type: 'error' | 'success') => {
    if (type === 'error') {
      setError(message);
      setTimeout(() => setError(''), 3000);
    } else {
      setSuccess(message);
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = users.find(u => u.name === loginForm.name && u.accno === loginForm.accno);
    
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      showMessage('Login successful!', 'success');
    } else {
      showMessage('Invalid name or account number', 'error');
    }
    setIsLoading(false);
  };

  const handleTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    setIsLoading(true);
    setError('');
    setSuccess('');

    const amount = parseFloat(transactionForm.amount);
    
    if (amount <= 0) {
      showMessage('Amount must be greater than 0', 'error');
      setIsLoading(false);
      return;
    }

    if (transactionForm.type === 'debit' && amount > currentUser.balance) {
      showMessage('Insufficient balance', 'error');
      setIsLoading(false);
      return;
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newBalance = transactionForm.type === 'credit' 
      ? currentUser.balance + amount 
      : currentUser.balance - amount;

    const newTransaction: Transaction = {
      id: Date.now(),
      type: transactionForm.type,
      amount,
      timestamp: new Date(),
      balance: newBalance
    };

    setCurrentUser({ ...currentUser, balance: newBalance });
    setTransactions(prev => [newTransaction, ...prev]);
    setTransactionForm({ amount: '', type: 'credit' });
    setShowTransactionForm(false);
    showMessage(`Successfully ${transactionForm.type}ed $${amount}`, 'success');
    setIsLoading(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    setTransactions([]);
    setLoginForm({ name: '', accno: '' });
    setShowTransactionForm(false);
    setError('');
    setSuccess('');
  };

  const startTransaction = (type: 'credit' | 'debit') => {
    setTransactionForm({ ...transactionForm, type });
    setShowTransactionForm(true);
  };

  return {
    // State
    currentUser,
    isLoggedIn,
    loginForm,
    transactionForm,
    showTransactionForm,
    transactions,
    error,
    success,
    isLoading,
    
    // Actions
    setLoginForm,
    setTransactionForm,
    setShowTransactionForm,
    handleLogin,
    handleTransaction,
    handleLogout,
    startTransaction
  };
};