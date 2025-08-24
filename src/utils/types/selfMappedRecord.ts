export type SelfMappedRecord<T extends string> = {
  [K in T]: K;
};
