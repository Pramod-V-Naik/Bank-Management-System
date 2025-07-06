export interface User {
  name: string;
  accno: string;
  balance: number;
}

export interface Transaction {
  id: number;
  type: 'credit' | 'debit';
  amount: number;
  timestamp: Date;
  balance: number;
}

export interface LoginForm {
  name: string;
  accno: string;
}

export interface TransactionForm {
  amount: string;
  type: 'credit' | 'debit';
}