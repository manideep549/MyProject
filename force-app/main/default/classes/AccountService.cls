public with sharing class AccountService {

    /**
     * Returns number of accounts (max 10)
     */
    public static Integer getAccountCount() {
        List<Account> accountList = [
            SELECT Id
            FROM Account
            LIMIT 10
        ];

        return accountList.size();
    }

}