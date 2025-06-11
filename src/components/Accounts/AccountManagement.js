import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  DollarSign,
  Calendar,
  Users,
  Building,
  X,
  ChevronDown,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  ArrowLeftRight,
  Wallet,
  PiggyBank,
  Briefcase
} from 'lucide-react';
import { accountService, customerService } from '../../services';

const AccountCard = ({ account, customer, onViewDetails, onEdit }) => {
  const getAccountTypeInfo = (type) => {
    switch (type) {
      case 'CHECKING':
        return {
          name: 'Checking Account',
          icon: Wallet,
          color: 'bg-blue-500',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-700'
        };
      case 'SAVINGS':
        return {
          name: 'Savings Account',
          icon: PiggyBank,
          color: 'bg-green-500',
          bgColor: 'bg-green-50',
          textColor: 'text-green-700'
        };
      case 'BUSINESS':
        return {
          name: 'Business Account',
          icon: Briefcase,
          color: 'bg-purple-500',
          bgColor: 'bg-purple-50',
          textColor: 'text-purple-700'
        };
      default:
        return {
          name: 'Account',
          icon: CreditCard,
          color: 'bg-gray-500',
          bgColor: 'bg-gray-50',
          textColor: 'text-gray-700'
        };
    }
  };

  const typeInfo = getAccountTypeInfo(account.accountType);
  const TypeIcon = typeInfo.icon;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group">
      <div className={`${typeInfo.bgColor} p-4 rounded-t-xl`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 ${typeInfo.color} rounded-lg`}>
              <TypeIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className={`font-semibold ${typeInfo.textColor}`}>{typeInfo.name}</h3>
              <p className="text-sm text-gray-600">#{account.accountNumber}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onViewDetails(account)}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-white rounded-lg transition-colors"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => onEdit(account)}
              className="p-2 text-gray-400 hover:text-purple-600 hover:bg-white rounded-lg transition-colors"
            >
              <Edit className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Hesap İçeriği */}
      <div className="p-4 space-y-4">
        {/* Müşteri Bilgisi */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <Users className="w-4 h-4 text-gray-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">
              {customer?.firstName} {customer?.lastName}
            </p>
            <p className="text-sm text-gray-500">{customer?.email}</p>
          </div>
        </div>

        {/* Bakiye */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-green-600" />
            <span className="text-sm text-gray-600">Balance</span>
          </div>
          <span className="text-lg font-bold text-gray-900">
            ₺{account.balance?.toLocaleString() || '0'}
          </span>
        </div>

        {/* Hesap Durumu */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {account.status === 'ACTIVE' ? (
              <CheckCircle className="w-4 h-4 text-green-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600" />
            )}
            <span className="text-sm text-gray-600">Status</span>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            account.status === 'ACTIVE' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {account.status === 'ACTIVE' ? 'Active' : 'Inactive'}
          </span>
        </div>

        {/* Oluşturma Tarihi */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-500">Opening Date</span>
          </div>
          <span className="text-xs text-gray-500">
            {account.createdAt ? new Date(account.createdAt).toLocaleDateString('en-US') : 'Unknown'}
          </span>
        </div>
      </div>
    </div>
  );
};

const AccountDetailModal = ({ account, customer, isOpen, onClose, onEdit }) => {
  if (!isOpen || !account) return null;

  const getAccountTypeInfo = (type) => {
    switch (type) {
      case 'CHECKING':
        return { name: 'Checking Account', icon: Wallet, color: 'bg-blue-500' };
      case 'SAVINGS':
        return { name: 'Savings Account', icon: PiggyBank, color: 'bg-green-500' };
      case 'BUSINESS':
        return { name: 'Business Account', icon: Briefcase, color: 'bg-purple-500' };
      default:
        return { name: 'Account', icon: CreditCard, color: 'bg-gray-500' };
    }
  };

  const typeInfo = getAccountTypeInfo(account.accountType);
  const TypeIcon = typeInfo.icon;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className={`p-3 ${typeInfo.color} rounded-lg`}>
              <TypeIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Account Details</h2>
              <p className="text-sm text-gray-500">#{account.accountNumber}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal İçerik */}
        <div className="p-6 space-y-6">
          {/* Temel Bilgiler */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Account Information</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Number:</span>
                  <span className="font-medium">{account.accountNumber}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Type:</span>
                  <span className="font-medium">{typeInfo.name}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    account.status === 'ACTIVE' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {account.status === 'ACTIVE' ? 'Active' : 'Inactive'}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Balance:</span>
                  <span className="font-bold text-lg text-green-600">
                    ₺{account.balance?.toLocaleString() || '0'}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Customer Information</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Full Name:</span>
                  <span className="font-medium">
                    {customer?.firstName} {customer?.lastName}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{customer?.email}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium">{customer?.phoneNumber || 'Not specified'}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Customer ID:</span>
                  <span className="font-medium">{customer?.customerId}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tarih Bilgileri */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Date Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Opening Date:</span>
                <span className="font-medium">
                  {account.createdAt ? new Date(account.createdAt).toLocaleDateString('en-US') : 'Unknown'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Update:</span>
                <span className="font-medium">
                  {account.updatedAt ? new Date(account.updatedAt).toLocaleDateString('en-US') : 'Unknown'}
                </span>
              </div>
            </div>
          </div>

          {/* Açıklama */}
          {account.description && (
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{account.description}</p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              onEdit(account);
              onClose();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Edit
          </button>
        </div>
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
            <h2 className="text-xl font-semibold text-gray-900">Create New Account</h2>
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

const AccountManagement = () => {
  const [accounts, setAccounts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [showFilters, setShowFilters] = useState(false);
  
  const [showNewAccountModal, setShowNewAccountModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      const customersResponse = await customerService.getAllActiveCustomers();
      const customersData = customersResponse.success ? customersResponse.data || [] : [];
      setCustomers(customersData);

      const allAccounts = [];
      for (const customer of customersData) {
        try {
          const accountsResponse = await accountService.getAccountsByCustomerId(customer.customerId);
          if (accountsResponse.success && accountsResponse.data) {
            accountsResponse.data.forEach(account => {
              allAccounts.push({
                ...account,
                customer: customer
              });
            });
          }
        } catch (error) {
          console.log(`Accounts could not be retrieved: ${customer.customerId}`);
        }
      }
      
      setAccounts(allAccounts);
    } catch (error) {
      console.error('Data fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = 
      account.accountNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.customer?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.customer?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.customer?.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === 'ALL' || account.accountType === filterType;
    const matchesStatus = filterStatus === 'ALL' || account.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const handleViewDetails = (account) => {
    setSelectedAccount(account);
    setSelectedCustomer(account.customer);
    setShowDetailModal(true);
  };

  const handleEdit = (account) => {
    console.log('Edit account:', account);
  };

  const handleSuccess = () => {
    fetchData();
  };

  const stats = {
    total: accounts.length,
    checking: accounts.filter(acc => acc.accountType === 'CHECKING').length,
    savings: accounts.filter(acc => acc.accountType === 'SAVINGS').length,
    business: accounts.filter(acc => acc.accountType === 'BUSINESS').length,
    totalBalance: accounts.reduce((sum, acc) => sum + (acc.balance || 0), 0)
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-64 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Account Management</h1>
          <p className="text-gray-600 mt-1">Manage all bank accounts</p>
        </div>
        <button
          onClick={() => setShowNewAccountModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Account</span>
        </button>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <CreditCard className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Accounts</p>
              <p className="text-xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Wallet className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Checking</p>
              <p className="text-xl font-bold text-blue-600">{stats.checking}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <PiggyBank className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Savings</p>
              <p className="text-xl font-bold text-green-600">{stats.savings}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Briefcase className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Business</p>
              <p className="text-xl font-bold text-purple-600">{stats.business}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Balance</p>
              <p className="text-lg font-bold text-green-600">₺{stats.totalBalance.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Arama ve Filtreleme */}
      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Arama */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by account number, customer name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filtre Butonu */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span>Filter</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Filtre Seçenekleri */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="ALL">All Types</option>
                  <option value="CHECKING">Checking Account</option>
                  <option value="SAVINGS">Savings Account</option>
                  <option value="BUSINESS">Business Account</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hesap Listesi */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAccounts.map((account) => (
          <AccountCard
            key={account.accountNumber}
            account={account}
            customer={account.customer}
            onViewDetails={handleViewDetails}
            onEdit={handleEdit}
          />
        ))}
      </div>

      {/* Sonuç bulunamadı */}
      {filteredAccounts.length === 0 && !loading && (
        <div className="text-center py-12">
          <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No accounts found</h3>
          <p className="text-gray-500 mb-6">No accounts match your search criteria.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setFilterType('ALL');
              setFilterStatus('ALL');
            }}
            className="text-blue-600 hover:text-blue-800"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Modal'lar */}
      <NewAccountModal
        isOpen={showNewAccountModal}
        onClose={() => setShowNewAccountModal(false)}
        onSuccess={handleSuccess}
      />

      <AccountDetailModal
        account={selectedAccount}
        customer={selectedCustomer}
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default AccountManagement; 