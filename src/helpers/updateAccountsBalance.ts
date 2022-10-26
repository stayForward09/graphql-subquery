import { ensureAccount } from "./verifyAccount";

export const updateAccountBalances = async (accounts: string[]) => {
    const balances = await api.query.system.account.multi(accounts);
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