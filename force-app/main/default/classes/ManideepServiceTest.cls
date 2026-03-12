@isTest
private class ManideepServiceTest {

    @isTest
    static void testAddNumbers(){

        Integer result = ManideepService.addNumbers(5,10);

        System.assertEquals(15,result);

    }

}