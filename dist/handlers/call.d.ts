import { SubstrateExtrinsic } from '@subql/types';
export declare class CallHandler {
    private extrinsic;
    private dispatcher;
    static ensureCall(id: string): Promise<void>;
    constructor(extrinsic: SubstrateExtrinsic);
    private registerSubHandler;
    get hash(): string;
    get signer(): string;
    private traver;
    save(): Promise<void>;
}
