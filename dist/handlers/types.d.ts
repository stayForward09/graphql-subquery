import type { CallBase, AnyTuple } from '@polkadot/types/types';
import type { SubstrateExtrinsic } from '@subql/types';
import { Dispatcher } from '../helpers/dispatcher';
export declare type AnyCall = CallBase<AnyTuple>;
export interface DispatchedCallData {
    id: string;
    call: AnyCall;
    extrinsic: SubstrateExtrinsic;
    isSuccess: boolean;
}
export declare type CallDispatcher = Dispatcher<DispatchedCallData>;
export declare type callHandler = (data: DispatchedCallData) => Promise<any>;
export declare const VESTING = "vesting";
export declare const ADD_VESTING_SCHEDULE = "VestingScheduleAdded";
