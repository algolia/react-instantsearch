export function cx(...classNames: Array<string | boolean | undefined>) {
  return classNames.filter(Boolean).join(' ');
}
