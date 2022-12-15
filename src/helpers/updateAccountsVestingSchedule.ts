import { Codec } from '@polkadot/types/types';
import { VestingData } from "../types";
import { ensureAccount } from "./verifyAccount";

export const updateAccountsVestingSchedule = async (accounts: Codec[]) => {
    const vestingSchedules = await api.query.vesting.vestingSchedules.multi(accounts.map(account => account.toString()));
    const accountsWithVestingSchedules = accounts.map((account, index) => {
        const vestingSchedule = vestingSchedules[index];
        return { account, vestingSchedule };
    });
    return Promise.all(accountsWithVestingSchedules.map(async ({ account, vestingSchedule }) => {
        const accountEntity = await ensureAccount(account);
        accountEntity.vestingSchedule = vestingSchedule.toHuman() as VestingData[];
        logger.debug('Vesting schedule updated' + JSON.stringify(vestingSchedule.toHuman()))
        await accountEntity.save();
    }));

}