import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddTransaction = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionType, setTransactionType] = useState('expense');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!description.trim() || !amount.trim()) {
      setError('Please enter both description and amount');
      return;
    }
    
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setError('Amount must be a positive number');
      return;
    }
    
    const newTransaction = {
      id: Date.now(),
      description: description.trim(),
      amount: transactionType === 'income' ? amountNum : -amountNum,
      date: new Date().toISOString(),
      type: transactionType
    };
    
    const existingTransactions = JSON.parse(sessionStorage.getItem('transactions') || '[]');
    const updatedTransactions = [...existingTransactions, newTransaction];
    sessionStorage.setItem('transactions', JSON.stringify(updatedTransactions));
    
    setDescription('');
    setAmount('');
    setError('');
    navigate('/transaction-history');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Transaction</h2>
        
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Transaction Type
            </label>
            <div className="flex space-x-4 mb-4">
              <button
                type="button"
                className={`px-4 py-2 rounded-lg ${
                  transactionType === 'income' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => setTransactionType('income')}
              >
                Income
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-lg ${
                  transactionType === 'expense' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => setTransactionType('expense')}
              >
                Expense
              </button>
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Enter ${transactionType} description...`}
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="amount" className="block text-gray-700 font-medium mb-2">
              Amount
            </label>
            <div className="flex items-center">
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter amount (positive number only)"
                step="0.01"
                min="0.01"
              />
            </div>
            <p className="text-gray-500 text-sm mt-1">
              Enter the amount as a positive number
            </p>
          </div>
          
          <div className="flex justify-center gap-4">
            <button
              type="submit"
              className={`${
                transactionType === 'income' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
              } text-white px-6 py-2 rounded-lg`}
            >
              Add {transactionType === 'income' ? 'Income' : 'Expense'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;