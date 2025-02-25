import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  useEffect(() => {
    const storedTransactions = JSON.parse(sessionStorage.getItem('transactions') || '[]');
    setTransactions(storedTransactions);

    let totalIncome = 0;
    let totalExpenses = 0;

    storedTransactions.forEach(transaction => {
      const amount = parseFloat(transaction.amount);
      if (amount > 0) {
        totalIncome += amount;
      } else {
        totalExpenses += Math.abs(amount);
      }
    });

    setIncome(totalIncome);
    setExpenses(totalExpenses);
    setBalance(totalIncome - totalExpenses);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Dashboard</h2>
        
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold mb-2">Your Balance</h3>
          <p className={`text-3xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${balance.toFixed(2)}
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-green-100 p-4 rounded-lg text-center">
            <h3 className="text-lg font-semibold text-green-800">Income</h3>
            <p className="text-2xl font-bold text-green-600">${income.toFixed(2)}</p>
          </div>
          <div className="bg-red-100 p-4 rounded-lg text-center">
            <h3 className="text-lg font-semibold text-red-800">Expenses</h3>
            <p className="text-2xl font-bold text-red-600">${expenses.toFixed(2)}</p>
          </div>
        </div>
        
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => navigate('/add-transaction')} 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Transaction
          </button>
          <button 
            onClick={() => navigate('/transaction-history')} 
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            View History
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;