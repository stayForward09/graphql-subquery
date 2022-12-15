import { Codec } from '@polkadot/types/types';
import { Account } from "../types/models/Account";


export async function ensureAccount(account: Codec) {
    const accountId = account.toString();
    let foundAccount = await Account.get(accountId);
    if (!foundAccount) {
        // logger.debug('Account not found, creating new account', accountId);
        foundAccount = new Account(accountId);
        foundAccount.balance = BigInt(0);
    }
    return foundAccount
}