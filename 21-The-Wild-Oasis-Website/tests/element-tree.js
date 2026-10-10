import { Children, isValidElement } from 'react';

export function findElements(node, predicate, found = []) {
  if (!isValidElement(node)) return found;
  if (predicate(node)) found.push(node);
  Children.forEach(node.props?.children, (child) => {
    findElements(child, predicate, found);
  });
  return found;
}
