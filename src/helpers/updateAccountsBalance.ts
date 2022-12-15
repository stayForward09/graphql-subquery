import { Codec } from '@polkadot/types/types';
import { ensureAccount } from "./verifyAccount";

export const updateAccountBalances = async (accounts: Codec[]) => {
    const balances = await api.query.system.account.multi(accounts.map(account => account.toString()));
    const accountsWithBalances = accounts.map((account, index) => {
        const { data: { free: balance } } = balances[index];
        return { account, balance };
    });
    return Promise.all(accountsWithBalances.map(async ({ account, balance }) => {
        const accountEntity = await ensureAccount(account);
        accountEntity.balance = balance.toBigInt();
        await accountEntity.save();
    }));
}