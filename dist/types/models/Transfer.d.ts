import { Entity, FunctionPropertyNames } from "@subql/types";
export declare class Transfer implements Entity {
    constructor(id: string);
    id: string;
    fromId?: string;
    toId?: string;
    amount?: bigint;
    extrinsicId?: string;
    callId?: string;
    timestamp?: Date;
    isSuccess?: boolean;
    save(): Promise<void>;
    static remove(id: string): Promise<void>;
    static get(id: string): Promise<Transfer | undefined>;
    static getByFromId(fromId: string): Promise<Transfer[] | undefined>;
    static getByToId(toId: string): Promise<Transfer[] | undefined>;
    static getByAmount(amount: bigint): Promise<Transfer[] | undefined>;
    static getByExtrinsicId(extrinsicId: string): Promise<Transfer[] | undefined>;
    static getByCallId(callId: string): Promise<Transfer[] | undefined>;
    static getByTimestamp(timestamp: Date): Promise<Transfer[] | undefined>;
    static create(record: Partial<Omit<Transfer, FunctionPropertyNames<Transfer>>> & Entity): Transfer;
}
