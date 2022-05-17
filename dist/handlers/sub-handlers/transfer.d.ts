import { DispatchedCallData } from '../types';
export declare class TransferHandler {
    static createFromCurrenciesModule({ id, call, extrinsic, isSuccess }: DispatchedCallData): Promise<void>;
}
