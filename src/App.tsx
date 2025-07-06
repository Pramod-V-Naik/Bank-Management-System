import React from 'react';
import { LoginForm } from './components/LoginForm';
import { Header } from './components/Header';
import { BalanceCard } from './components/BalanceCard';
import { TransactionForm } from './components/TransactionForm';
import { TransactionHistory } from './components/TransactionHistory';
import { AlertMessage } from './components/AlertMessage';
import { useBankSystem } from './hooks/useBankSystem';

function App() {
  const {
    currentUser,
    isLoggedIn,
    loginForm,
    transactionForm,
    showTransactionForm,
    transactions,
    error,
    success,
    isLoading,
    setLoginForm,
    setTransactionForm,
    setShowTransactionForm,
    handleLogin,
    handleTransaction,
    handleLogout,
    startTransaction
  } = useBankSystem();

  if (!isLoggedIn) {
    return (
      <>
        <LoginForm
          loginForm={loginForm}
          setLoginForm={setLoginForm}
          onSubmit={handleLogin}
          isLoading={isLoading}
        />
        {error && <AlertMessage message={error} type="error" />}
        {success && <AlertMessage message={success} type="success" />}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-gradient-to-r from-transparent via-white to-transparent transform rotate-45 scale-150"></div>
      </div>
      
      <div className="relative z-10 p-6">
        <Header currentUser={currentUser!} onLogout={handleLogout} />

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <BalanceCard
              currentUser={currentUser!}
              onCreditClick={() => startTransaction('credit')}
              onDebitClick={() => startTransaction('debit')}
            />
          </div>

          <div className="lg:col-span-2">
            {showTransactionForm ? (
              <TransactionForm
                transactionForm={transactionForm}
                setTransactionForm={setTransactionForm}
                onSubmit={handleTransaction}
                onCancel={() => setShowTransactionForm(false)}
                isLoading={isLoading}
              />
            ) : (
              <TransactionHistory transactions={transactions} />
            )}
          </div>
        </div>
      </div>

      {error && <AlertMessage message={error} type="error" />}
      {success && <AlertMessage message={success} type="success" />}
    </div>
  );
}

export default App;