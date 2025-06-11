import apiClient from './api';


export const customerService = {
  getAllActiveCustomers: async () => {
    const response = await apiClient.get('/api/v1/customers');
    return response.data;
  },

  getCustomerById: async (customerId) => {
    const response = await apiClient.get(`/api/v1/customers/${customerId}`);
    return response.data;
  },

  getCustomerByEmail: async (email) => {
    const response = await apiClient.get('/api/v1/customers/email', { params: { email } });
    return response.data;
  },

  createCustomer: async (customerData) => {
    const response = await apiClient.post('/api/v1/customers', customerData);
    return response.data;
  },

  updateCustomer: async (customerId, customerData) => {
    const response = await apiClient.put(`/api/v1/customers/${customerId}`, customerData);
    return response.data;
  },

  deactivateCustomer: async (customerId) => {
    const response = await apiClient.delete(`/api/v1/customers/${customerId}`);
    return response.data;
  },

  checkEmailAvailability: async (email) => {
    const response = await apiClient.get('/api/v1/customers/check-email', { params: { email } });
    return response.data;
  },

  checkNationalIdAvailability: async (nationalId) => {
    const response = await apiClient.get('/api/v1/customers/check-national-id', { params: { nationalId } });
    return response.data;
  },
};

export default customerService; 