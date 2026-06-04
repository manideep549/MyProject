public with sharing class SampleController {
    
    // PMD WILL FLAG THIS: Avoid using hardcoded variables without purpose
    public static String dummyVariable;

    public static void runSampleProcess() {
        Integer counter = 0;

        // PMD WILL FLAG THIS: Empty while statement rule violation
        while (counter < 0) {
            // Intentional empty block to trigger PMD validation failure
        }
        
        System.debug('Process executed successfully.');
    }
}
