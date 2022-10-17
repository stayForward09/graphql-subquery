import { Account } from "../types/models/Account";


export async function ensureAccount(accountId: string) {
    let account = await Account.get(accountId);
    if (!account) {
        // logger.debug('Account not found, creating new account', accountId);
        account = new Account(accountId);
        account.balance = BigInt(0);
    }
    return account
}