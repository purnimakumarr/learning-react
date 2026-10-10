import { vi } from 'vitest';

export function setViewport(width) {
  window.matchMedia = vi.fn().mockImplementation((query) => {
    const minWidth = query.match(/\(min-width:\s*(\d+)px\)/);
    const maxWidth = query.match(/\(max-width:\s*(\d+)px\)/);
    let matches = true;

    if (minWidth) matches = width >= Number(minWidth[1]);
    if (maxWidth) matches = matches && width <= Number(maxWidth[1]);

    return {
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    };
  });
}
