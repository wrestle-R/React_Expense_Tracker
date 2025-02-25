import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Expense Tracker</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Dashboard</Link>
          <Link to="/add-transaction" className="hover:underline">Add Transaction</Link>
          <Link to="/transaction-history" className="hover:underline">Transaction History</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;