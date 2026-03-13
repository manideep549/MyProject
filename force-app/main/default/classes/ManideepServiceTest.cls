@isTest
private class ManideepServiceTest {

    @isTest
    static void testAddNumbers() {

        Profile p = [SELECT Id FROM Profile WHERE Name='Standard User' LIMIT 1];

        User testUser = new User(
            Alias = 'tuser',
            Email='testuser@test.com',
            EmailEncodingKey='UTF-8',
            LastName='Testing',
            LanguageLocaleKey='en_US',
            LocaleSidKey='en_US',
            ProfileId = p.Id,
            TimeZoneSidKey='America/Los_Angeles',
            Username='testuser' + System.currentTimeMillis() + '@test.com'
        );

        
        insert testUser;

        System.runAs(testUser) {

            Integer result = ManideepService.addNumbers(5,10);

            System.assertEquals(15, result, 'Addition result should be correct');

        }
    }
}