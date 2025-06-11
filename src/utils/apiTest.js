import { customerService, accountService, transactionService } from '../services';

export const testCustomerOperations = async () => {
  try {
    // Create sample customer
    const sampleCustomer = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '+90 555 123 4567',
      nationalId: '12345678901'
    };

    console.log('👤 Creating sample customer:', sampleCustomer);
    const response = await customerService.createCustomer(sampleCustomer);
    console.log('✅ Customer created:', response);
    return response;
  } catch (error) {
    console.error('❌ Customer could not be created:', error);
  }
};

export const testAccountOperations = async () => {
  try {
    const sampleAccount = {
      customerId: '1', 
      accountType: 'CHECKING',
      initialBalance: 1000,
      description: 'Test checking account'
    };

    console.log('🏦 Creating sample account:', sampleAccount);
    const response = await accountService.createAccount(sampleAccount);
    console.log('✅ Account created:', response);
    return response;
  } catch (error) {
    console.error('❌ Account could not be created:', error);
  }
};

export const runAllTests = async () => {
  console.log('🚀 Starting API tests...');
  
  await testCustomerOperations();
  await testAccountOperations();
  
  console.log('✨ API tests completed!');
};

export default {
  testCustomerOperations,
  testAccountOperations,
  runAllTests
}; 