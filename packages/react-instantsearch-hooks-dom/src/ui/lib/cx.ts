type Root = string | number | boolean | undefined | null;
export type CSSClass = Root | Root[];

export function cx(...classNames: CSSClass[]) {
  return classNames
    .reduce<Root[]>((acc, curr) => acc.concat(curr), [])
    .filter(Boolean)
    .join(' ');
}
