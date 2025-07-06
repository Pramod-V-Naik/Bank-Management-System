import React from 'react';

interface AlertMessageProps {
  message: string;
  type: 'error' | 'success';
}

export const AlertMessage: React.FC<AlertMessageProps> = ({ message, type }) => {
  const bgColor = type === 'error' ? 'bg-red-500/90' : 'bg-green-500/90';
  
  return (
    <div className={`fixed top-4 right-4 ${bgColor} backdrop-blur-sm text-white px-6 py-3 rounded-lg shadow-lg animate-slide-in z-50`}>
      {message}
    </div>
  );
};