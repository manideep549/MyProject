@isTest
private class AccountServiceTest {

    @isTest
    static void testGetAccountCount() {

        List<Account> testAccounts = new List<Account>();

        for (Integer i = 0; i < 5; i++) {
            testAccounts.add(new Account(Name = 'Test Account ' + i));
        }

        insert testAccounts;

        Test.startTest();
        Integer result = AccountService.getAccountCount();
        Test.stopTest();

        System.assert(result > 0, 'Account count should be greater than zero');
    }

}