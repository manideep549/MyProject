@isTest
private class AccountServiceTest {

    @TestSetup
    static void setupData() {
        List<Account> accounts = new List<Account>();

        for (Integer i = 0; i < 5; i++) {
            accounts.add(new Account(Name = 'Test Account ' + i));
        }

        insert accounts;
    }

    @isTest
    static void testGetAccountCount() {

        Test.startTest();
        Integer result = AccountService.getAccountCount();
        Test.stopTest();

        System.assert(result > 0, 'Account count should be greater than zero');
    }
}