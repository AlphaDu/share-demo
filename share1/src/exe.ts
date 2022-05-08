
type GetPromiseValue<T> = T extends Promise<infer U> ? U : T;

type GetArrayTypeInPromise<T> = T extends Promise<infer U> ? U extends Array<infer V> ? V : never : never;

