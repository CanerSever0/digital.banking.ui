import React, { useState, useEffect } from 'react';
import {
  ArrowLeftRight,
  Plus,
  Search,
  Filter,
  Eye,
  Download,
  Upload,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  X,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Wallet,
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft
} from 'lucide-react';
import { transactionService, accountService, customerService } from '../../services';

const TransactionCard = ({ transaction, onViewDetails }) => {
  const getTransactionTypeInfo = (type) => {
    switch (type) {
      case 'TRANSFER':
        return {
          name: 'Transfer',
          icon: ArrowLeftRight,
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200'
        };
      case 'DEPOSIT':
        return {
          name: 'Deposit',
          icon: ArrowDownLeft,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200'
        };
      case 'WITHDRAW':
        return {
          name: 'Withdraw',
          icon: ArrowUpRight,
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200'
        };
      default:
        return {
          name: 'Transaction',
          icon: DollarSign,
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200'
        };
    }
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case 'COMPLETED':
        return {
          name: 'Completed',
          icon: CheckCircle,
          color: 'text-green-700',
          bgColor: 'bg-green-100'
        };
      case 'PENDING':
        return {
          name: 'Pending',
          icon: Clock,
          color: 'text-yellow-700',
          bgColor: 'bg-yellow-100'
        };
      case 'FAILED':
        return {
          name: 'Failed',
          icon: XCircle,
          color: 'text-red-700',
          bgColor: 'bg-red-100'
        };
      case 'CANCELLED':
        return {
          name: 'Cancelled',
          icon: AlertTriangle,
          color: 'text-gray-700',
          bgColor: 'bg-gray-100'
        };
      default:
        return {
          name: 'Unknown',
          icon: AlertTriangle,
          color: 'text-gray-700',
          bgColor: 'bg-gray-100'
        };
    }
  };

  const typeInfo = getTransactionTypeInfo(transaction.type);
  const statusInfo = getStatusInfo(transaction.status);
  const TypeIcon = typeInfo.icon;
  const StatusIcon = statusInfo.icon;

  return (
    <div className={`bg-white rounded-xl shadow-sm border ${typeInfo.borderColor} hover:shadow-md transition-all duration-200 group cursor-pointer`}>
      {/* Transaction Header */}
      <div className={`${typeInfo.bgColor} p-4 rounded-t-xl`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 bg-white rounded-lg shadow-sm`}>
              <TypeIcon className={`w-5 h-5 ${typeInfo.color}`} />
            </div>
            <div>
              <h3 className={`font-semibold ${typeInfo.color}`}>{typeInfo.name}</h3>
              <p className="text-sm text-gray-600">#{transaction.transactionId}</p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full ${statusInfo.bgColor} flex items-center space-x-1`}>
            <StatusIcon className={`w-3 h-3 ${statusInfo.color}`} />
            <span className={`text-xs font-medium ${statusInfo.color}`}>
              {statusInfo.name}
            </span>
          </div>
        </div>
      </div>

      {/* Transaction Content */}
      <div className="p-4 space-y-4">
        {/* Amount */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Amount</span>
          <span className={`text-lg font-bold ${
            transaction.type === 'DEPOSIT' ? 'text-green-600' : 
            transaction.type === 'WITHDRAW' ? 'text-red-600' : 'text-gray-900'
          }`}>
            {transaction.type === 'DEPOSIT' ? '+' : transaction.type === 'WITHDRAW' ? '-' : ''}
            ₺{transaction.amount?.toLocaleString() || '0'}
          </span>
        </div>

        {/* Accounts */}
        {transaction.type === 'TRANSFER' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">From:</span>
              <span className="font-medium">{transaction.fromAccount}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">To:</span>
              <span className="font-medium">{transaction.toAccount}</span>
            </div>
          </div>
        )}

        {transaction.type !== 'TRANSFER' && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Account:</span>
            <span className="font-medium">{transaction.accountNumber}</span>
          </div>
        )}

        {/* Description */}
        {transaction.description && (
          <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
            {transaction.description}
          </div>
        )}

        {/* Date and Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            <span>
              {transaction.createdAt ? new Date(transaction.createdAt).toLocaleDateString('en-US') : 'Unknown'}
            </span>
          </div>
          <button
            onClick={() => onViewDetails(transaction)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-1 group-hover:scale-105 transition-transform"
          >
            <Eye className="w-4 h-4" />
            <span>Details</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const TransactionDetailModal = ({ transaction, isOpen, onClose }) => {
  if (!isOpen || !transaction) return null;

  const getTransactionTypeInfo = (type) => {
    switch (type) {
      case 'TRANSFER':
        return { name: 'Money Transfer', icon: ArrowLeftRight, color: 'bg-blue-500' };
      case 'DEPOSIT':
        return { name: 'Deposit', icon: ArrowDownLeft, color: 'bg-green-500' };
      case 'WITHDRAW':
        return { name: 'Withdraw', icon: ArrowUpRight, color: 'bg-red-500' };
      default:
        return { name: 'Transaction', icon: DollarSign, color: 'bg-gray-500' };
    }
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case 'COMPLETED':
        return { name: 'Completed', color: 'bg-green-100 text-green-700' };
      case 'PENDING':
        return { name: 'Pending', color: 'bg-yellow-100 text-yellow-700' };
      case 'FAILED':
        return { name: 'Failed', color: 'bg-red-100 text-red-700' };
      case 'CANCELLED':
        return { name: 'Cancelled', color: 'bg-gray-100 text-gray-700' };
      default:
        return { name: 'Unknown', color: 'bg-gray-100 text-gray-700' };
    }
  };

  const typeInfo = getTransactionTypeInfo(transaction.type);
  const statusInfo = getStatusInfo(transaction.status);
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
              <h2 className="text-xl font-semibold text-gray-900">Transaction Details</h2>
              <p className="text-sm text-gray-500">#{transaction.transactionId}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Transaction Information</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction ID:</span>
                  <span className="font-medium">{transaction.transactionId}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium">{typeInfo.name}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                    {statusInfo.name}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className={`font-bold text-lg ${
                    transaction.type === 'DEPOSIT' ? 'text-green-600' : 
                    transaction.type === 'WITHDRAW' ? 'text-red-600' : 'text-gray-900'
                  }`}>
                    {transaction.type === 'DEPOSIT' ? '+' : transaction.type === 'WITHDRAW' ? '-' : ''}
                    ₺{transaction.amount?.toLocaleString() || '0'}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Account Information</h3>
              
              <div className="space-y-3">
                {transaction.type === 'TRANSFER' ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">From Account:</span>
                      <span className="font-medium">{transaction.fromAccount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">To Account:</span>
                      <span className="font-medium">{transaction.toAccount}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Account Number:</span>
                    <span className="font-medium">{transaction.accountNumber}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Reference:</span>
                  <span className="font-medium">{transaction.reference || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Date Information */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Date Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Created:</span>
                <span className="font-medium">
                  {transaction.createdAt ? new Date(transaction.createdAt).toLocaleString('en-US') : 'Unknown'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Updated:</span>
                <span className="font-medium">
                  {transaction.updatedAt ? new Date(transaction.updatedAt).toLocaleString('en-US') : 'Unknown'}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          {transaction.description && (
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{transaction.description}</p>
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
        </div>
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
            console.log('Account could not be retrieved:', customer.customerId);
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
            <h2 className="text-xl font-semibold text-gray-900">New Transfer</h2>
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

const TransactionManagement = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [showFilters, setShowFilters] = useState(false);
  
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      
      const mockTransactions = [
        {
          transactionId: 'TXN001',
          type: 'TRANSFER',
          amount: 1500,
          status: 'COMPLETED',
          fromAccount: '1234567890',
          toAccount: '0987654321',
          description: 'Monthly salary transfer',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          reference: 'REF001'
        },
        {
          transactionId: 'TXN002',
          type: 'DEPOSIT',
          amount: 5000,
          status: 'COMPLETED',
          accountNumber: '1234567890',
          description: 'Cash deposit',
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          updatedAt: new Date(Date.now() - 3600000).toISOString(),
          reference: 'REF002'
        },
        {
          transactionId: 'TXN003',
          type: 'WITHDRAW',
          amount: 800,
          status: 'PENDING',
          accountNumber: '0987654321',
          description: 'ATM withdrawal',
          createdAt: new Date(Date.now() - 7200000).toISOString(),
          updatedAt: new Date(Date.now() - 7200000).toISOString(),
          reference: 'REF003'
        },
        {
          transactionId: 'TXN004',
          type: 'TRANSFER',
          amount: 2500,
          status: 'FAILED',
          fromAccount: '1122334455',
          toAccount: '5544332211',
          description: 'Payment failed due to insufficient funds',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          updatedAt: new Date(Date.now() - 86400000).toISOString(),
          reference: 'REF004'
        }
      ];

      setTransactions(mockTransactions);
    } catch (error) {
      console.error('Transaction fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.transactionId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.fromAccount?.includes(searchTerm) ||
      transaction.toAccount?.includes(searchTerm) ||
      transaction.accountNumber?.includes(searchTerm) ||
      transaction.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === 'ALL' || transaction.type === filterType;
    const matchesStatus = filterStatus === 'ALL' || transaction.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const handleViewDetails = (transaction) => {
    setSelectedTransaction(transaction);
    setShowDetailModal(true);
  };

  const handleSuccess = () => {
    fetchTransactions();
  };

  const stats = {
    total: transactions.length,
    completed: transactions.filter(t => t.status === 'COMPLETED').length,
    pending: transactions.filter(t => t.status === 'PENDING').length,
    failed: transactions.filter(t => t.status === 'FAILED').length,
    totalAmount: transactions
      .filter(t => t.status === 'COMPLETED')
      .reduce((sum, t) => sum + (t.amount || 0), 0)
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
          <h1 className="text-2xl font-bold text-gray-900">Transaction Management</h1>
          <p className="text-gray-600 mt-1">Monitor and manage all financial transactions</p>
        </div>
        <button
          onClick={() => setShowTransferModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Transfer</span>
        </button>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ArrowLeftRight className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Transactions</p>
              <p className="text-xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-xl font-bold text-green-600">{stats.completed}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Failed</p>
              <p className="text-xl font-bold text-red-600">{stats.failed}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Volume</p>
              <p className="text-lg font-bold text-green-600">₺{stats.totalAmount.toLocaleString()}</p>
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
              placeholder="Search by transaction ID, account number or description..."
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Type</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="ALL">All Types</option>
                  <option value="TRANSFER">Transfer</option>
                  <option value="DEPOSIT">Deposit</option>
                  <option value="WITHDRAW">Withdraw</option>
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
                  <option value="COMPLETED">Completed</option>
                  <option value="PENDING">Pending</option>
                  <option value="FAILED">Failed</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* İşlem Listesi */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTransactions.map((transaction) => (
          <TransactionCard
            key={transaction.transactionId}
            transaction={transaction}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {/* Sonuç bulunamadı */}
      {filteredTransactions.length === 0 && !loading && (
        <div className="text-center py-12">
          <ArrowLeftRight className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
          <p className="text-gray-500 mb-6">No transactions match your search criteria.</p>
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
      <TransferModal
        isOpen={showTransferModal}
        onClose={() => setShowTransferModal(false)}
        onSuccess={handleSuccess}
      />

      <TransactionDetailModal
        transaction={selectedTransaction}
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
      />
    </div>
  );
};

export default TransactionManagement; 