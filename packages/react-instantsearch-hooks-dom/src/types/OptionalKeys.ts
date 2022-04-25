export type OptionalKeys<TObject> = {
  [TKey in keyof TObject]-?: {} extends Pick<TObject, TKey> ? TKey : never;
}[keyof TObject];
