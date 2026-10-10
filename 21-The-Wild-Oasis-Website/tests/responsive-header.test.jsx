import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Header from '@/app/_components/Header';
import { tokens } from './class-names';

vi.mock('@/app/_components/Navigation', () => ({
  default: function Navigation() {
    return <nav>Primary</nav>;
  },
}));

describe('site header', () => {
  it('stacks on phones and returns to a row with laptop padding from large screens', () => {
    const { container } = render(<Header />);
    const header = container.querySelector('header');
    const bar = header.firstElementChild;

    expect(tokens(header)).toContain('px-4');
    expect(tokens(header)).toContain('lg:px-8');
    expect(tokens(header)).not.toContain('px-8');

    expect(tokens(bar)).toContain('flex-col');
    expect(tokens(bar)).toContain('sm:flex-row');
    expect(tokens(bar)).toContain('sm:justify-between');
    expect(tokens(bar)).not.toContain('justify-between');
  });

  it('uses a smaller wordmark on phones', () => {
    render(<Header />);
    const wordmark = screen.getByText('The Wild Oasis');

    expect(tokens(wordmark)).toContain('text-lg');
    expect(tokens(wordmark)).toContain('sm:text-xl');
    expect(tokens(wordmark)).not.toContain('text-xl');
  });
});
