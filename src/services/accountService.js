import apiClient from './api';


export const accountService = {
  createAccount: async (accountData) => {
    const response = await apiClient.post('/api/v1/accounts', accountData);
    return response.data;
  },

  getAccountByNumber: async (accountNumber) => {
    const response = await apiClient.get(`/api/v1/accounts/${accountNumber}`);
    return response.data;
  },

  getAccountsByCustomerId: async (customerId) => {
    const response = await apiClient.get(`/api/v1/accounts/customer/${customerId}`);
    return response.data;
  },

  getAccountBalance: async (accountNumber) => {
    const response = await apiClient.get(`/api/v1/accounts/${accountNumber}/balance`);
    return response.data;
  },

  deposit: async (depositData) => {
    const response = await apiClient.post('/api/v1/accounts/deposit', depositData);
    return response.data;
  },

  withdraw: async (withdrawData) => {
    const response = await apiClient.post('/api/v1/accounts/withdraw', withdrawData);
    return response.data;
  },

  deactivateAccount: async (accountNumber) => {
    const response = await apiClient.delete(`/api/v1/accounts/${accountNumber}`);
    return response.data;
  },
};

export default accountService; 