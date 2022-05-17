import { Entity, FunctionPropertyNames } from "@subql/types";
export declare class Block implements Entity {
    constructor(id: string);
    id: string;
    number?: bigint;
    timestamp?: Date;
    parentHash?: string;
    specVersion?: number;
    save(): Promise<void>;
    static remove(id: string): Promise<void>;
    static get(id: string): Promise<Block | undefined>;
    static getByNumber(number: bigint): Promise<Block[] | undefined>;
    static getByTimestamp(timestamp: Date): Promise<Block[] | undefined>;
    static create(record: Partial<Omit<Block, FunctionPropertyNames<Block>>> & Entity): Block;
}
