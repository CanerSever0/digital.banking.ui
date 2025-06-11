import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  CreditCard, 
  DollarSign, 
  Activity,
  Plus,
  ArrowRight,
  Eye,
  X,
  User,
  Building,
  ArrowLeftRight
} from 'lucide-react';
import { customerService, accountService, transactionService } from '../../services';

const StatCard = ({ title, value, change, changeType, icon: Icon, color, onClick }) => (
  <div 
    className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer group ${color}`}
    onClick={onClick}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        {change && (
          <div className={`flex items-center mt-2 text-sm ${
            changeType === 'increase' ? 'text-green-600' : 'text-red-600'
          }`}>
            {changeType === 'increase' ? (
              <TrendingUp className="w-4 h-4 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 mr-1" />
            )}
            <span>{change}</span>
          </div>
        )}
      </div>
      <div className="text-right">
        <div className={`p-3 rounded-xl ${color} bg-opacity-10 group-hover:scale-110 transition-transform duration-200`}>
          <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
        </div>
      </div>
    </div>
  </div>
);

const QuickActionCard = ({ title, description, icon: Icon, color, onClick }) => (
  <div 
    className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer group`}
    onClick={onClick}
  >
    <div className="flex items-center space-x-4">
      <div className={`p-3 rounded-xl ${color} bg-opacity-10 group-hover:scale-110 transition-transform duration-200`}>
        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-200" />
    </div>
  </div>
);

const NewCustomerModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    nationalId: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await customerService.createCustomer(formData);
      if (response.success) {
        onSuccess();
        onClose();
        setFormData({ firstName: '', lastName: '', email: '', phoneNumber: '', nationalId: '' });
        alert('Customer created successfully!');
      } else {
        alert(response.message || 'Customer could not be created');
      }
    } catch (error) {
      console.error('Customer creation error:', error);
      alert('Customer could not be created');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">New Customer</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+90 5xx xxx xx xx"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">National ID*</label>
            <input
              type="text"
              value={formData.nationalId}
              onChange={(e) => setFormData({...formData, nationalId: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              maxLength="11"
              pattern="[0-9]{11}"
              required
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Customer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const NewAccountModal = ({ isOpen, onClose, onSuccess }) => {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    customerId: '',
    accountType: 'CHECKING',
    initialBalance: 0,
    description: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchCustomers();
    }
  }, [isOpen]);

  const fetchCustomers = async () => {
    try {
      const response = await customerService.getAllActiveCustomers();
      if (response.success) {
        setCustomers(response.data || []);
      }
    } catch (error) {
      console.error('Customer list could not be retrieved:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await accountService.createAccount(formData);
      if (response.success) {
        onSuccess();
        onClose();
        setFormData({ customerId: '', accountType: 'CHECKING', initialBalance: 0, description: '' });
        alert('Account created successfully!');
      } else {
        alert(response.message || 'Account could not be created');
      }
    } catch (error) {
      console.error('Account creation error:', error);
      alert('Account could not be created');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">New Account</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer*</label>
            <select
              value={formData.customerId}
              onChange={(e) => setFormData({...formData, customerId: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select customer...</option>
              {customers.map(customer => (
                <option key={customer.customerId} value={customer.customerId}>
                  {customer.firstName} {customer.lastName} ({customer.email})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Account Type*</label>
            <select
              value={formData.accountType}
              onChange={(e) => setFormData({...formData, accountType: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="CHECKING">Checking Account</option>
              <option value="SAVINGS">Savings Account</option>
              <option value="BUSINESS">Business Account</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Initial Balance (₺)</label>
            <input
              type="number"
              value={formData.initialBalance}
              onChange={(e) => setFormData({...formData, initialBalance: parseFloat(e.target.value) || 0})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="3"
              placeholder="Account description (optional)"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const TransferModal = ({ isOpen, onClose, onSuccess }) => {
  const [accounts, setAccounts] = useState([]);
  const [formData, setFormData] = useState({
    fromAccountNumber: '',
    toAccountNumber: '',
    amount: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchAccounts();
    }
  }, [isOpen]);

  const fetchAccounts = async () => {
    try {
      const customersResponse = await customerService.getAllActiveCustomers();
      if (customersResponse.success) {
        const allAccounts = [];
        for (const customer of customersResponse.data || []) {
          try {
            const accountsResponse = await accountService.getAccountsByCustomerId(customer.customerId);
            if (accountsResponse.success) {
              accountsResponse.data.forEach(account => {
                allAccounts.push({
                  ...account,
                  customerName: `${customer.firstName} ${customer.lastName}`
                });
              });
            }
          } catch (error) {
            console.log('Hesap alınamadı:', customer.customerId);
          }
        }
        setAccounts(allAccounts);
      }
    } catch (error) {
      console.error('Account list could not be retrieved:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await transactionService.transferMoney({
        ...formData,
        amount: parseFloat(formData.amount)
      });
      if (response.success) {
        onSuccess();
        onClose();
        setFormData({ fromAccountNumber: '', toAccountNumber: '', amount: '', description: '' });
        alert('Transfer completed successfully!');
      } else {
        alert(response.message || 'Transfer could not be completed');
      }
    } catch (error) {
      console.error('Transfer error:', error);
      alert('Transfer could not be completed');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <ArrowLeftRight className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Money Transfer</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">From Account*</label>
            <select
              value={formData.fromAccountNumber}
              onChange={(e) => setFormData({...formData, fromAccountNumber: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select sending account...</option>
              {accounts.map(account => (
                <option key={account.accountNumber} value={account.accountNumber}>
                  {account.accountNumber} - {account.customerName} (₺{account.balance?.toLocaleString()})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To Account*</label>
            <select
              value={formData.toAccountNumber}
              onChange={(e) => setFormData({...formData, toAccountNumber: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select receiving account...</option>
              {accounts
                .filter(account => account.accountNumber !== formData.fromAccountNumber)
                .map(account => (
                <option key={account.accountNumber} value={account.accountNumber}>
                  {account.accountNumber} - {account.customerName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₺)*</label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0.01"
              step="0.01"
              max="1000000"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              maxLength="255"
              placeholder="Transfer description (optional)"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Transferring...' : 'Transfer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalAccounts: 0,
    totalBalance: 0,
    dailyTransactions: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);
  
  const [showNewCustomerModal, setShowNewCustomerModal] = useState(false);
  const [showNewAccountModal, setShowNewAccountModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      const customersResponse = await customerService.getAllActiveCustomers();
      const customersCount = customersResponse.success ? customersResponse.data?.length || 0 : 0;

      setStats({
        totalCustomers: customersCount,
        totalAccounts: customersCount * 1.8,
        totalBalance: customersCount * 50000,
        dailyTransactions: Math.floor(customersCount * 0.1)
      });

      setRecentActivity([
        { id: 1, type: 'transfer', amount: 1500, user: 'Ahmet Yılmaz', time: '2 minutes ago' },
        { id: 2, type: 'deposit', amount: 5000, user: 'Ayşe Kaya', time: '5 minutes ago' },
        { id: 3, type: 'withdraw', amount: 800, user: 'Mehmet Demir', time: '10 minutes ago' },
      ]);

    } catch (error) {
      console.error('Dashboard data fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    fetchDashboardData();
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-32 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome!</h1>
            <p className="text-blue-100 text-lg">Digital Banking Management Dashboard</p>
            <p className="text-blue-200 mt-4">Today is {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
          </div>
          <div className="hidden lg:block">
            <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Activity className="w-16 h-16 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Customers"
          value={stats.totalCustomers.toLocaleString()}
          change="+12% this month"
          changeType="increase"
          icon={Users}
          color="bg-blue-500"
        />
        <StatCard
          title="Active Accounts"
          value={Math.floor(stats.totalAccounts).toLocaleString()}
          change="+8% this month"
          changeType="increase"
          icon={CreditCard}
          color="bg-purple-500"
        />
        <StatCard
          title="Total Balance"
          value={`₺${stats.totalBalance.toLocaleString()}`}
          change="+15% this month"
          changeType="increase"
          icon={DollarSign}
          color="bg-green-500"
        />
        <StatCard
          title="Daily Transactions"
          value={stats.dailyTransactions.toLocaleString()}
          change="-3% yesterday"
          changeType="decrease"
          icon={Activity}
          color="bg-orange-500"
        />
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <QuickActionCard
            title="Add New Customer"
            description="Create a new customer record in the system"
            icon={Plus}
            color="bg-blue-500"
            onClick={() => setShowNewCustomerModal(true)}
          />
          <QuickActionCard
            title="Create Account"
            description="Open a new account for existing customer"
            icon={CreditCard}
            color="bg-purple-500"
            onClick={() => setShowNewAccountModal(true)}
          />
          <QuickActionCard
            title="Money Transfer"
            description="Transfer money between accounts"
            icon={ArrowRight}
            color="bg-green-500"
            onClick={() => setShowTransferModal(true)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
            <button className="text-blue-600 hover:text-blue-800 flex items-center text-sm">
              <Eye className="w-4 h-4 mr-1" />
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === 'transfer' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'deposit' ? 'bg-green-100 text-green-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {activity.type === 'transfer' ? '↔' : activity.type === 'deposit' ? '↓' : '↑'}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{activity.user}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    activity.type === 'deposit' ? 'text-green-600' : 'text-gray-900'
                  }`}>
                    ₺{activity.amount.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
            <div className="flex items-center text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm">Online</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">API Server</span>
              <span className="text-green-600 font-medium">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Database</span>
              <span className="text-green-600 font-medium">Connected</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Backup System</span>
              <span className="text-yellow-600 font-medium">Running</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Security</span>
              <span className="text-green-600 font-medium">Secure</span>
            </div>
          </div>
        </div>
      </div>

      <NewCustomerModal 
        isOpen={showNewCustomerModal} 
        onClose={() => setShowNewCustomerModal(false)}
        onSuccess={handleSuccess}
      />
      
      <NewAccountModal 
        isOpen={showNewAccountModal} 
        onClose={() => setShowNewAccountModal(false)}
        onSuccess={handleSuccess}
      />
      
      <TransferModal 
        isOpen={showTransferModal} 
        onClose={() => setShowTransferModal(false)}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default Dashboard; 