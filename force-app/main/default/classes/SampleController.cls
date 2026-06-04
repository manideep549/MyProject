public with sharing class SampleController {
    
    /**
     * Executes a clean process loop without triggering PMD violations.
     * Evaluates a maximum record limit parameter safely.
     */
    public static void runSampleProcess() {
        Integer counter = 0;
        Integer maxLimit = 5;

        // Clean loop with active operations inside the block
        while (counter < maxLimit) {
            counter++;
        }
        
        System.debug('Process completed loop count: ' + counter);
    }
}
