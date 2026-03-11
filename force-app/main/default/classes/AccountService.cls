public with sharing class AccountService {

    public static Integer getAccountCount() {
        List<Account> accountList = [SELECT Id FROM Account LIMIT 10];
        return accountList.size();
    }

}