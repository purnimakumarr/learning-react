import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Navigation from '@/app/_components/Navigation';
import { tokens } from './class-names';

describe('primary navigation', () => {
  it('wraps with compact spacing on phones and restores laptop spacing on large screens', async () => {
    render(await Navigation());
    const list = screen.getByRole('list');
    const nav = list.closest('nav');

    expect(tokens(nav)).toContain('text-base');
    expect(tokens(nav)).toContain('lg:text-xl');
    expect(tokens(nav)).not.toContain('text-xl');
    expect(tokens(nav)).toContain('w-full');
    expect(tokens(nav)).toContain('sm:w-auto');

    expect(tokens(list)).toContain('flex-wrap');
    expect(tokens(list)).toContain('gap-4');
    expect(tokens(list)).toContain('sm:gap-8');
    expect(tokens(list)).toContain('lg:gap-16');
    expect(tokens(list)).not.toContain('gap-16');
    expect(tokens(list)).toContain('justify-center');
    expect(tokens(list)).toContain('sm:justify-end');
  });
});
