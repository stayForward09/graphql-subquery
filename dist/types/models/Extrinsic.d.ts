import { Entity, FunctionPropertyNames } from "@subql/types";
export declare class Extrinsic implements Entity {
    constructor(id: string);
    id: string;
    method?: string;
    section?: string;
    args?: string;
    signerId?: string;
    nonce?: bigint;
    timestamp?: Date;
    signature?: string;
    tip?: bigint;
    isSigned?: boolean;
    isSuccess?: boolean;
    blockId?: string;
    save(): Promise<void>;
    static remove(id: string): Promise<void>;
    static get(id: string): Promise<Extrinsic | undefined>;
    static getByMethod(method: string): Promise<Extrinsic[] | undefined>;
    static getBySection(section: string): Promise<Extrinsic[] | undefined>;
    static getBySignerId(signerId: string): Promise<Extrinsic[] | undefined>;
    static getByTimestamp(timestamp: Date): Promise<Extrinsic[] | undefined>;
    static getByBlockId(blockId: string): Promise<Extrinsic[] | undefined>;
    static create(record: Partial<Omit<Extrinsic, FunctionPropertyNames<Extrinsic>>> & Entity): Extrinsic;
}
