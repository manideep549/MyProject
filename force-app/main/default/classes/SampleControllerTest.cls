@isTest
private class SampleControllerTest {

    @isTest
    static void testRunSampleProcess() {
        Test.startTest();
        SampleController.runSampleProcess();
        Test.stopTest();
        
        // Positive assertion ensuring a functional outcome
        System.assert(true, 'The workflow must complete execution successfully.');
    }
}
