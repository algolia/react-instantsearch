export type CSSClass = string | number | boolean | undefined | null;

export function cx(...classNames: CSSClass[]) {
  return classNames.filter(Boolean).join(' ');
}
