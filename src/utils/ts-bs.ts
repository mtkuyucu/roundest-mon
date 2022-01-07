export type AsyncReturnType<T> = T extends (...args: any[]) => Promise<infer U>
  ? U
  : T;
