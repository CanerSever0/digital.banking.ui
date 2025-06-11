import apiClient from './api';


export const transactionService = {
  transferMoney: async (transferData) => {
    const response = await apiClient.post('/api/v1/transactions/transfer', transferData);
    return response.data;
  },

  getTransactionById: async (transactionId) => {
    const response = await apiClient.get(`/api/v1/transactions/${transactionId}`);
    return response.data;
  },

  getAccountTransactions: async (accountNumber, limit = 50) => {
    const response = await apiClient.get(`/api/v1/accounts/${accountNumber}/transactions`, {
      params: { limit }
    });
    return response.data;
  },

  getTransactionsByDateRange: async (startDate, endDate, accountNumber = null) => {
    const response = await apiClient.get('/api/v1/transactions', {
      params: {
        startDate,
        endDate,
        accountNumber
      }
    });
    return response.data;
  },

  updateTransactionStatus: async (transactionId, status) => {
    const response = await apiClient.put(`/api/v1/transactions/${transactionId}/status`, null, {
      params: { status }
    });
    return response.data;
  },

  getTransactionsByStatus: async (status) => {
    const response = await apiClient.get(`/api/v1/transactions/status/${status}`);
    return response.data;
  },
};

export default transactionService; 