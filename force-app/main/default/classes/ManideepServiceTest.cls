@isTest
private class ManideepServiceTest {

    @isTest
    static void testGetGreeting() {

        Profile profileRecord = [
            SELECT Id
            FROM Profile
            WHERE Name = 'Standard User'
            LIMIT 1
        ];

        User testUser = new User(
            Alias = 'mtest',
            Email = 'manideep@test.com',
            EmailEncodingKey = 'UTF-8',
            LastName = 'Test',
            LanguageLocaleKey = 'en_US',
            LocaleSidKey = 'en_US',
            ProfileId = profileRecord.Id,
            TimeZoneSidKey = 'America/Los_Angeles',
            UserName = 'manideep' + System.currentTimeMillis() + '@test.com'
        );

        insert testUser;

        System.runAs(testUser) {

            Test.startTest();

            String result = ManideepService.getGreeting();

            Test.stopTest();

            System.assertEquals(
                'Hello Manideep',
                result,
                'Greeting message should match'
            );
        }
    }

}