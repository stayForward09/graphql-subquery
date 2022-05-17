import { Entity, FunctionPropertyNames } from "@subql/types";
export declare class Call implements Entity {
    constructor(id: string);
    id: string;
    section?: string;
    method?: string;
    args?: string;
    timestamp?: Date;
    isSuccess?: boolean;
    signerId?: string;
    extrinsicId?: string;
    parentCallId?: string;
    save(): Promise<void>;
    static remove(id: string): Promise<void>;
    static get(id: string): Promise<Call | undefined>;
    static getBySection(section: string): Promise<Call[] | undefined>;
    static getByMethod(method: string): Promise<Call[] | undefined>;
    static getByTimestamp(timestamp: Date): Promise<Call[] | undefined>;
    static getBySignerId(signerId: string): Promise<Call[] | undefined>;
    static getByExtrinsicId(extrinsicId: string): Promise<Call[] | undefined>;
    static getByParentCallId(parentCallId: string): Promise<Call[] | undefined>;
    static create(record: Partial<Omit<Call, FunctionPropertyNames<Call>>> & Entity): Call;
}
