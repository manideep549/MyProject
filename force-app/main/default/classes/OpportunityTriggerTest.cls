@isTest
private class OpportunityTriggerTest {

    @isTest
    static void testOpportunityClosedWon() {
        // 1. Create test data (Stage is 'Closed Won')
        Opportunity opp = new Opportunity(
            Name = 'Test Won Opportunity',
            StageName = 'Closed Won',
            CloseDate = Date.today().addDays(30)
        );

        // 2. Execute the trigger via DML
        Test.startTest();
        insert opp;
        Test.stopTest();

        // 3. Re-query the record from the database to verify the trigger updated the description
        Opportunity updatedOpp = [SELECT Description FROM Opportunity WHERE Id = :opp.Id];
        
        // 4. Assert that the before insert/update logic successfully appended the description
        Assert.areEqual(
            'Pipeline Test: This opportunity has been successfully won! test', 
            updatedOpp.Description, 
            'The description should be updated automatically when an Opportunity is Closed Won.'
        );
    }

    @isTest
    static void testOpportunityNotClosedWon() {
        // 1. Create test data (Stage is NOT 'Closed Won')
        Opportunity opp = new Opportunity(
            Name = 'Test Prospecting Opportunity',
            StageName = 'Prospecting',
            CloseDate = Date.today().addDays(30),
            Description = 'Original Description'
        );

        // 2. Execute the trigger via DML
        Test.startTest();
        insert opp;
        Test.stopTest();

        // 3. Re-query the record
        Opportunity updatedOpp = [SELECT Description FROM Opportunity WHERE Id = :opp.Id];
        
        // 4. Assert that the description remained unchanged
        Assert.areEqual(
            'Original Description', 
            updatedOpp.Description, 
            'The description should not change if the Opportunity is not Closed Won.'
        );
    }

    @isTest
    static void testOpportunityUpdateToClosedWon() {
        // 1. Create an opportunity that is initially not won
        Opportunity opp = new Opportunity(
            Name = 'Test Update Opportunity',
            StageName = 'Prospecting',
            CloseDate = Date.today().addDays(30)
        );
        insert opp;

        // 2. Update the stage to 'Closed Won' to test the "before update" context
        opp.StageName = 'Closed Won';

        Test.startTest();
        update opp;
        Test.stopTest();

        // 3. Re-query the record
        Opportunity updatedOpp = [SELECT Description FROM Opportunity WHERE Id = :opp.Id];
        
        // 4. Assert that the description updated successfully during the update transaction
        Assert.areEqual(
            'Pipeline Test: This opportunity has been successfully won! test', 
            updatedOpp.Description, 
            'The description should be updated when an existing Opportunity transitions to Closed Won.'
        );
    }
}