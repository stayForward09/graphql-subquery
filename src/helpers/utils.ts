import { Codec } from '@polkadot/types/types';
const kickedAccounts = new Set<string>();

kickedAccounts.add('4jbtsgNhpGAzdEGrKRb7g8Mq4ToNUpBVxeye942tWfG3gcYi');

export const isKicked = (account: Codec): boolean => {
    return kickedAccounts.has(account.toString());
};