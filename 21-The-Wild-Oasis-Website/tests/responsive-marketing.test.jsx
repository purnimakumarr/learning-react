import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AboutPage from '@/app/about/page';
import HomePage from '@/app/page';
import LoginPage from '@/app/login/page';
import { tokens } from './class-names';

describe('home page', () => {
  it('scales the hero down on phones and keeps the laptop headline at extra-large widths', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', { name: /welcome to paradise/i });
    const hero = heading.closest('main');

    expect(tokens(heading)).toEqual(
      expect.arrayContaining([
        'text-4xl',
        'sm:text-5xl',
        'md:text-6xl',
        'lg:text-7xl',
        'xl:text-8xl',
      ]),
    );
    expect(tokens(heading)).not.toContain('text-8xl');
    expect(tokens(hero)).toContain('mt-12');
    expect(tokens(hero)).toContain('lg:mt-24');
    expect(tokens(hero)).not.toContain('mt-24');
  });

  it('covers the hero photo without stretching it', () => {
    render(<HomePage />);
    const photo = screen.getByRole('img', {
      name: /mountains and forests with two cabins/i,
    });

    expect(tokens(photo)).toContain('object-cover');
    expect(tokens(photo)).toContain('object-top');
  });

  it('gives the hero link room to wrap on a narrow screen', () => {
    render(<HomePage />);
    const cta = screen.getByRole('link', { name: /explore luxury cabins/i });

    expect(tokens(cta)).toContain('px-5');
    expect(tokens(cta)).toContain('py-4');
    expect(tokens(cta)).toContain('text-base');
    expect(tokens(cta)).toContain('sm:px-8');
    expect(tokens(cta)).toContain('sm:py-6');
    expect(tokens(cta)).toContain('sm:text-lg');
    expect(tokens(cta)).not.toContain('px-8');
    expect(tokens(cta)).not.toContain('text-lg');
  });
});

describe('about page', () => {
  it('stacks the story on phones and restores the five-column layout on tablets', async () => {
    render(await AboutPage());
    const grid = document.querySelector('main') ?? document.body.firstElementChild;
    const layout = screen.getByRole('heading', {
      name: /welcome to the wild oasis/i,
    }).parentElement.parentElement;

    expect(tokens(layout)).toContain('grid-cols-1');
    expect(tokens(layout)).toContain('md:grid-cols-5');
    expect(tokens(layout)).not.toContain('grid-cols-5');
    expect(tokens(layout)).toContain('gap-8');
    expect(tokens(layout)).toContain('md:gap-x-10');
    expect(tokens(layout)).toContain('lg:gap-x-24');
    expect(tokens(layout)).not.toContain('gap-x-24');
    expect(tokens(layout)).toContain('gap-y-12');
    expect(tokens(layout)).toContain('lg:gap-y-32');
    expect(tokens(layout)).not.toContain('gap-y-32');
    expect(grid).toBeTruthy();

    const sections = layout.querySelectorAll(':scope > div');
    expect(tokens(sections[0])).toContain('md:col-span-3');
    expect(tokens(sections[0])).not.toContain('col-span-3');
    expect(tokens(sections[1])).toContain('md:col-span-2');
    expect(tokens(sections[1])).not.toContain('col-span-2');
    expect(tokens(sections[2])).toContain('md:col-span-2');
    expect(tokens(sections[3])).toContain('md:col-span-3');
  });

  it('lets the photographs shrink to the screen width', async () => {
    render(await AboutPage());

    for (const photo of screen.getAllByRole('img')) {
      expect(tokens(photo)).toContain('w-full');
      expect(tokens(photo)).toContain('h-auto');
    }
  });

  it('uses a smaller heading on phones', async () => {
    render(await AboutPage());
    const heading = screen.getByRole('heading', {
      name: /welcome to the wild oasis/i,
    });

    expect(tokens(heading)).toContain('text-3xl');
    expect(tokens(heading)).toContain('md:text-4xl');
    expect(tokens(heading)).not.toContain('text-4xl');
  });
});

describe('login page', () => {
  it('keeps the sign-in prompt and button inside a phone width', () => {
    render(<LoginPage />);
    const heading = screen.getByRole('heading', {
      name: /sign in to access your guest area/i,
    });
    const button = screen.getByRole('button', { name: /continue with google/i });

    expect(tokens(heading)).toContain('text-2xl');
    expect(tokens(heading)).toContain('sm:text-3xl');
    expect(tokens(heading)).toContain('text-center');
    expect(tokens(heading)).not.toContain('text-3xl');

    expect(tokens(button)).toContain('px-6');
    expect(tokens(button)).toContain('sm:px-10');
    expect(tokens(button)).toContain('text-base');
    expect(tokens(button)).toContain('sm:text-lg');
    expect(tokens(button)).not.toContain('px-10');
    expect(tokens(button)).not.toContain('text-lg');
  });
});
