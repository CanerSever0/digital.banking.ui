import React, { useState } from 'react';
import './App.css';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import CustomerManagement from './components/Customers/CustomerManagement';
import AccountManagement from './components/Accounts/AccountManagement';
import TransactionManagement from './components/Transactions/TransactionManagement';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'customers':
        return <CustomerManagement />;
      case 'accounts':
        return <AccountManagement />;
      case 'transactions':
        return <TransactionManagement />;
      case 'analytics':
        return (
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Analytics</h2>
            <p className="text-gray-600">Analytics page coming soon...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Settings</h2>
            <p className="text-gray-600">Settings page coming soon...</p>
          </div>
        );
      case 'help':
        return (
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Help</h2>
            <p className="text-gray-600">Help page coming soon...</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
