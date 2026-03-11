@isTest
private class AccountServiceTest {

    @isTest
    static void testGetAccountCount() {

        Profile p = [
            SELECT Id
            FROM Profile
            WHERE Name = 'Standard User'
            LIMIT 1
        ];

        User testUser = new User(
            Alias = 'tuser',
            Email = 'testuser@test.com',
            EmailEncodingKey = 'UTF-8',
            LastName = 'User',
            LanguageLocaleKey = 'en_US',
            LocaleSidKey = 'en_US',
            ProfileId = p.Id,
            TimeZoneSidKey = 'America/Los_Angeles',
            UserName = 'testuser' + System.currentTimeMillis() + '@test.com'
        );

        insert testUser;

        System.runAs(testUser) {

            List<Account> testAccounts = new List<Account>();

            for (Integer i = 0; i < 5; i++) {
                testAccounts.add(
                    new Account(Name = 'Test Account ' + i)
                );
            }

            insert testAccounts;

            Test.startTest();

            Integer result = AccountService.getAccountCount();

            Test.stopTest();

            System.assert(result > 0, 'Account count should be greater than zero');
        }
    }

}