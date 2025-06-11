import React, { useState, useEffect } from 'react';
import { customerService } from '../services';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCustomers = async () => {
    try {
      const response = await customerService.getAllActiveCustomers();
      if (response.success) {
        setCustomers(response.data || []);
      } else {
        setError(response.message || 'Error occurred while loading customers');
      }
    } catch (error) {
      console.error('Customer fetch error:', error);
      setError('Error occurred while loading customers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDeleteCustomer = async (customerId) => {
    if (!window.confirm('Are you sure you want to delete this customer?')) {
      return;
    }

    try {
      setLoading(true);
      const response = await customerService.deactivateCustomer(customerId);
      
      if (response.success) {
        setCustomers(customers.filter(customer => customer.customerId !== customerId));
        alert('Customer deleted successfully');
      } else {
        alert(response.message || 'Delete operation failed');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Error occurred during delete operation');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        <p>{error}</p>
        <button 
          onClick={fetchCustomers}
          className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Tekrar Dene
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Customer List</h1>
        <button 
          onClick={fetchCustomers}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Yenile
        </button>
      </div>

      {customers.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No customer records found yet.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {customers.map((customer) => (
            <div key={customer.customerId} className="bg-white p-6 rounded-lg shadow-md border">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {customer.firstName} {customer.lastName}
                </h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  customer.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {customer.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Email:</strong> {customer.email}</p>
                <p><strong>Telefon:</strong> {customer.phoneNumber || 'Belirtilmemiş'}</p>
                <p><strong>TC Kimlik:</strong> {customer.nationalId}</p>
                <p><strong>Kayıt Tarihi:</strong> {new Date(customer.createdAt).toLocaleDateString('tr-TR')}</p>
              </div>

              <div className="mt-4 flex space-x-2">
                <button className="flex-1 bg-blue-500 text-white py-2 px-3 rounded text-sm hover:bg-blue-600">
                  Edit
                </button>
                <button 
                  onClick={() => handleDeleteCustomer(customer.customerId)}
                  className="flex-1 bg-red-500 text-white py-2 px-3 rounded text-sm hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerList; 