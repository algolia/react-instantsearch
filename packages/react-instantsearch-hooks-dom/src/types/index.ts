/**
 * Make certain keys of an object optional
 */
export type PartialKeys<TObj, TKeys extends keyof TObj> = Omit<TObj, TKeys> &
  Partial<Pick<TObj, TKeys>>;

/**
 * Same as array#join, but for types
 * @example Join<[1, 2, 'hi'], '.'> -> `1.2.hi`
 */
export type Join<
  TArray extends ReadonlyArray<unknown>,
  TDelimiter extends string
> = TArray extends []
  ? ''
  : TArray extends [(string | number | boolean)?]
  ? `${TArray[0]}`
  : TArray extends [(string | number | boolean)?, ...infer Rest]
  ? `${TArray[0]}` | `${TArray[0]}${TDelimiter}${Join<Rest, TDelimiter>}`
  : never;

/**
 * Bug fix in regular `keyof` for tuples which includes array prototype, unlike keyof for object
 */
type KeyOf<TValue extends object> = TValue extends unknown[]
  ? Exclude<keyof TValue, Exclude<keyof [], number>>
  : keyof TValue;

/**
 * Retrieve the possible "path" tuples for a certain object.
 * @example
 * type ComplexShape = {
 *   nested: { item: any };
 *   tuple: [{ item: any }, { second: any }];
 *   array: Array<{ inside: any }>;
 * };
 * Path<ComplexShape> ->
 *   | ['nested']
 *   | ['nested', 'item']
 *   | ['tuple']
 *   | ['tuple', '0']
 *   | ['tuple', '0', 'item']
 *   | ['tuple', '1']
 *   | ['tuple', '1', 'second']
 *   | ['array']
 *   | ['array', number]
 *   | ['array', number, 'inside'];
 */
export type Path<TObj extends object> = {
  [TKey in KeyOf<TObj>]-?: TObj[TKey] extends object
    ? [TKey] | [TKey, ...Path<TObj[TKey]>]
    : [TKey];
}[KeyOf<TObj>];

/**
 * Retrieve the possible "path" tuples or string for a certain object.
 * @example
 * PathTupleOrString<{ item: { nested: true } }> ->
 *   | 'item'
 *   | 'item.nested'
 *   | ['item']
 *   | ['item', 'nested']
 */
export type PathTupleOrString<TObj extends object> =
  | Path<TObj>
  | Join<Path<TObj>, '.'>;
