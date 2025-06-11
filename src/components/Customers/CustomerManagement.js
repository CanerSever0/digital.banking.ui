import React, { useState, useEffect, useCallback } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  Eye, 
  Phone, 
  Mail, 
  User,
  Users,
  Calendar,
  XCircle,
  MoreVertical
} from 'lucide-react';
import { customerService } from '../../services';

const CustomerCard = ({ customer, onEdit, onDelete, onView }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {customer.firstName} {customer.lastName}
          </h3>
          <p className="text-sm text-gray-500">ID: {customer.customerId}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          customer.isActive 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {customer.isActive ? 'Active' : 'Inactive'}
        </span>
        <div className="relative">
          <button className="p-1 rounded-lg hover:bg-gray-100">
            <MoreVertical className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
    </div>

    <div className="space-y-3 mb-6">
      <div className="flex items-center space-x-3 text-sm">
        <Mail className="w-4 h-4 text-gray-400" />
        <span className="text-gray-600">{customer.email}</span>
      </div>
      <div className="flex items-center space-x-3 text-sm">
        <Phone className="w-4 h-4 text-gray-400" />
        <span className="text-gray-600">{customer.phoneNumber || 'Belirtilmemiş'}</span>
      </div>
      <div className="flex items-center space-x-3 text-sm">
        <User className="w-4 h-4 text-gray-400" />
        <span className="text-gray-600">TC: {customer.nationalId}</span>
      </div>
      <div className="flex items-center space-x-3 text-sm">
        <Calendar className="w-4 h-4 text-gray-400" />
        <span className="text-gray-600">
          Kayıt: {new Date(customer.createdAt).toLocaleDateString('tr-TR')}
        </span>
      </div>
    </div>

    <div className="flex space-x-2">
      <button
        onClick={() => onView(customer)}
        className="flex-1 bg-blue-50 text-blue-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors flex items-center justify-center space-x-1"
      >
        <Eye className="w-4 h-4" />
        <span>Görüntüle</span>
      </button>
      <button
        onClick={() => onEdit(customer)}
        className="flex-1 bg-gray-50 text-gray-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center justify-center space-x-1"
      >
        <Edit3 className="w-4 h-4" />
        <span>Edit</span>
      </button>
      <button
        onClick={() => onDelete(customer)}
        className="bg-red-50 text-red-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  </div>
);

const CustomerModal = ({ customer, isOpen, onClose, onSave, mode = 'view' }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    nationalId: ''
  });

  useEffect(() => {
    if (customer) {
      setFormData({
        firstName: customer.firstName || '',
        lastName: customer.lastName || '',
        email: customer.email || '',
        phoneNumber: customer.phoneNumber || '',
        nationalId: customer.nationalId || ''
      });
    }
  }, [customer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {mode === 'create' ? 'New Customer' : mode === 'edit' ? 'Edit Customer' : 'Customer Details'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ad</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                disabled={mode === 'view'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Soyad</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                disabled={mode === 'view'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              disabled={mode === 'view'}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
              disabled={mode === 'view'}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">TC Kimlik No</label>
            <input
              type="text"
              value={formData.nationalId}
              onChange={(e) => setFormData({...formData, nationalId: e.target.value})}
              disabled={mode === 'view' || mode === 'edit'}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
              required={mode === 'create'}
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {mode === 'view' ? 'Kapat' : 'İptal'}
            </button>
            {mode !== 'view' && (
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {mode === 'create' ? 'Create' : 'Update'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [modalMode, setModalMode] = useState('view');
  const [showModal, setShowModal] = useState(false);

  const filterCustomers = useCallback(() => {
    let filtered = customers;

    if (searchTerm) {
      filtered = filtered.filter(customer =>
        customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.nationalId.includes(searchTerm)
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(customer => 
        filterStatus === 'active' ? customer.isActive : !customer.isActive
      );
    }

    setFilteredCustomers(filtered);
  }, [customers, searchTerm, filterStatus]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    filterCustomers();
  }, [filterCustomers]);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await customerService.getAllActiveCustomers();
      if (response.success) {
        setCustomers(response.data || []);
      }
    } catch (error) {
      console.error('Customer list could not be loaded:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCustomer = async (customerData) => {
    try {
      const response = await customerService.createCustomer(customerData);
      if (response.success) {
        setShowModal(false);
        fetchCustomers();
        alert('Customer created successfully');
      } else {
        alert(response.message || 'Customer could not be created');
      }
    } catch (error) {
      console.error('Customer creation error:', error);
      alert('Customer could not be created');
    }
  };

  const handleUpdateCustomer = async (customerData) => {
    try {
      const response = await customerService.updateCustomer(selectedCustomer.customerId, customerData);
      if (response.success) {
        setShowModal(false);
        fetchCustomers();
        alert('Customer updated successfully');
      } else {
        alert(response.message || 'Customer could not be updated');
      }
    } catch (error) {
      console.error('Customer update error:', error);
      alert('Customer could not be updated');
    }
  };

  const handleDeleteCustomer = async (customer) => {
    if (window.confirm(`${customer.firstName} ${customer.lastName} müşterisini silmek istediğinizden emin misiniz?`)) {
      try {
        const response = await customerService.deactivateCustomer(customer.customerId);
        if (response.success) {
          fetchCustomers();
          alert('Müşteri başarıyla silindi');
        } else {
          alert(response.message || 'Müşteri silinemedi');
        }
      } catch (error) {
        console.error('Müşteri silme hatası:', error);
        alert('Müşteri silinemedi');
      }
    }
  };

  const openModal = (customer = null, mode = 'view') => {
    setSelectedCustomer(customer);
    setModalMode(mode);
    setShowModal(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Management</h1>
          <p className="text-gray-600 mt-1">Manage customer information and accounts</p>
        </div>
        <button
          onClick={() => openModal(null, 'create')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Customer</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name, email, phone or national ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <div className="flex items-center text-sm text-gray-600">
              <Filter className="w-4 h-4 mr-1" />
              <span>Filter</span>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-200 h-64 rounded-xl animate-pulse"></div>
          ))}
        </div>
      ) : filteredCustomers.length === 0 ? (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No customers found</h3>
          <p className="text-gray-500 mb-6">No customers match your search criteria.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setFilterStatus('all');
            }}
            className="text-blue-600 hover:text-blue-700"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map((customer) => (
            <CustomerCard
              key={customer.customerId}
              customer={customer}
              onView={(customer) => openModal(customer, 'view')}
              onEdit={(customer) => openModal(customer, 'edit')}
              onDelete={handleDeleteCustomer}
            />
          ))}
        </div>
      )}

      <CustomerModal
        customer={selectedCustomer}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={modalMode === 'create' ? handleCreateCustomer : handleUpdateCustomer}
        mode={modalMode}
      />
    </div>
  );
};

export default CustomerManagement; 