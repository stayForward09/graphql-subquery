import { Entity, FunctionPropertyNames } from "@subql/types";
export declare class SystemTokenTransfer implements Entity {
    constructor(id: string);
    id: string;
    fromId?: string;
    toId?: string;
    amount?: bigint;
    timestamp?: Date;
    extrinsicId?: string;
    save(): Promise<void>;
    static remove(id: string): Promise<void>;
    static get(id: string): Promise<SystemTokenTransfer | undefined>;
    static getByFromId(fromId: string): Promise<SystemTokenTransfer[] | undefined>;
    static getByToId(toId: string): Promise<SystemTokenTransfer[] | undefined>;
    static getByAmount(amount: bigint): Promise<SystemTokenTransfer[] | undefined>;
    static getByTimestamp(timestamp: Date): Promise<SystemTokenTransfer[] | undefined>;
    static getByExtrinsicId(extrinsicId: string): Promise<SystemTokenTransfer[] | undefined>;
    static create(record: Partial<Omit<SystemTokenTransfer, FunctionPropertyNames<SystemTokenTransfer>>> & Entity): SystemTokenTransfer;
}
