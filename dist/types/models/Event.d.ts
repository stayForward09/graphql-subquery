import { Entity, FunctionPropertyNames } from "@subql/types";
export declare class Event implements Entity {
    constructor(id: string);
    id: string;
    index: number;
    section: string;
    method: string;
    data: string;
    blockId?: string;
    extrinsicId?: string;
    save(): Promise<void>;
    static remove(id: string): Promise<void>;
    static get(id: string): Promise<Event | undefined>;
    static getBySection(section: string): Promise<Event[] | undefined>;
    static getByMethod(method: string): Promise<Event[] | undefined>;
    static getByBlockId(blockId: string): Promise<Event[] | undefined>;
    static getByExtrinsicId(extrinsicId: string): Promise<Event[] | undefined>;
    static create(record: Partial<Omit<Event, FunctionPropertyNames<Event>>> & Entity): Event;
}
