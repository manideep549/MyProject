trigger OpportunityTrigger on Opportunity (before insert, before update) {
    for (Opportunity opp : Trigger.new) {
        // Check if the opportunity is won
        if (opp.StageName == 'Closed Won') {
            opp.Description = 'Pipeline Test: This opportunity has been successfully won! test12';
        }
    }
}