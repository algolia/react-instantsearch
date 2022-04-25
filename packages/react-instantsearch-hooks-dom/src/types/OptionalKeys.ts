export type OptionalKeys<TObject> = {
  [TKey in keyof TObject]-?: Record<string, unknown> extends Pick<TObject, TKey>
    ? TKey
    : never;
}[keyof TObject];
