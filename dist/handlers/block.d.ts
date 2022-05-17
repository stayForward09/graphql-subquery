import { SubstrateBlock } from '@subql/types';
export declare class BlockHandler {
    private block;
    static ensureBlock(id: string): Promise<void>;
    constructor(block: SubstrateBlock);
    get blockTimestamp(): Date;
    get number(): bigint;
    get hash(): string;
    get specVersion(): number;
    get parentHash(): string;
    save(): Promise<void>;
}
