declare type AnyFunction = <T extends unknown[], R extends unknown>(args?: T) => R | Promise<R>;
export declare function tcWrapper<F extends AnyFunction>(fn: F): F;
export {};
