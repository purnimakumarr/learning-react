import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import RootLayout from '@/app/layout';
import { tokens } from './class-names';

vi.mock('@/app/_components/Header', () => ({
  default: function Header() {
    return <header>Site</header>;
  },
}));

vi.mock('@/app/_styles/globals.css', () => ({}));

describe('page shell', () => {
  it('uses phone padding by default and laptop padding from large screens', () => {
    render(
      <RootLayout>
        <p>Page</p>
      </RootLayout>,
    );

    const main = document.querySelector('main');
    const shell = main.parentElement;

    expect(tokens(shell)).toContain('px-4');
    expect(tokens(shell)).toContain('py-8');
    expect(tokens(shell)).toContain('lg:px-8');
    expect(tokens(shell)).toContain('lg:py-12');
    expect(tokens(shell)).not.toContain('px-8');
    expect(tokens(shell)).not.toContain('py-12');
    expect(tokens(main)).toContain('min-w-0');
  });
});
