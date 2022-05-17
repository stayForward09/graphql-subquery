import { SubstrateExtrinsic } from '@subql/types';
export declare class ExtrinsicHandler {
    private extrinsic;
    static ensureExtrinsic(id: string): Promise<void>;
    constructor(extrinsic: SubstrateExtrinsic);
    get id(): string;
    get method(): string;
    get section(): string;
    get args(): string;
    get signer(): string;
    get nonce(): bigint;
    get timestamp(): Date;
    get blockHash(): string;
    get isSigned(): boolean;
    get signature(): string;
    get tip(): bigint;
    get isSuccess(): boolean;
    get batchInterruptedIndex(): number;
    save(): Promise<void>;
}
