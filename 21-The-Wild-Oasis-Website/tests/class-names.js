export function tokens(target) {
  const className =
    typeof target === 'string'
      ? target
      : (target?.props?.className ?? target?.className ?? '');

  return String(className).split(/\s+/).filter(Boolean);
}
