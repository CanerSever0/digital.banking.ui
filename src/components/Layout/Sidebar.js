import React, { useState } from 'react';
import { 
  Home, 
  Users, 
  CreditCard, 
  ArrowUpDown, 
  PieChart, 
  Settings, 
  HelpCircle,
  ChevronLeft,
  ChevronRight 
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard', color: 'text-blue-600' },
    { id: 'customers', icon: Users, label: 'Customers', color: 'text-green-600' },
    { id: 'accounts', icon: CreditCard, label: 'Accounts', color: 'text-purple-600' },
    { id: 'transactions', icon: ArrowUpDown, label: 'Transactions', color: 'text-orange-600' },
    { id: 'analytics', icon: PieChart, label: 'Analytics', color: 'text-pink-600' },
    { id: 'settings', icon: Settings, label: 'Settings', color: 'text-gray-600' },
    { id: 'help', icon: HelpCircle, label: 'Help', color: 'text-indigo-600' },
  ];

  return (
    <div 
      className={`bg-white border-r border-gray-200 shadow-sm transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
              <p className="text-xs text-gray-500">Banking Management</p>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                isActive 
                  ? 'bg-blue-50 border border-blue-200 shadow-sm' 
                  : 'hover:bg-gray-50 hover:shadow-sm'
              }`}
            >
              <Icon 
                className={`w-5 h-5 ${
                  isActive ? 'text-blue-600' : `${item.color} group-hover:scale-110`
                } transition-all duration-200`} 
              />
              {!isCollapsed && (
                <span 
                  className={`font-medium ${
                    isActive ? 'text-blue-900' : 'text-gray-700'
                  }`}
                >
                  {item.label}
                </span>
              )}
              {!isCollapsed && isActive && (
                <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full"></div>
              )}
            </button>
          );
        })}
      </nav>

      {!isCollapsed && (
        <div className="p-4 mt-8">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-100">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-xs text-gray-600">Active Customers</span>
                <span className="text-xs font-semibold text-blue-600">1,234</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-600">Total Accounts</span>
                <span className="text-xs font-semibold text-purple-600">2,567</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-600">Daily Transactions</span>
                <span className="text-xs font-semibold text-green-600">89</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar; 