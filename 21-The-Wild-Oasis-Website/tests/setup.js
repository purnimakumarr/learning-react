import React from 'react';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';
import { setViewport } from './viewport';

setViewport(1280);

afterEach(() => {
  cleanup();
  setViewport(1280);
});

vi.mock('@/public/bg.png', () => ({ default: '/bg.png' }));
vi.mock('@/public/about-1.jpg', () => ({ default: '/about-1.jpg' }));
vi.mock('@/public/about-2.jpg', () => ({ default: '/about-2.jpg' }));
vi.mock('@/public/logo.png', () => ({ default: '/logo.png' }));

vi.mock('next/image', () => ({
  default: function Image({ src, alt, className }) {
    const resolved = typeof src === 'string' ? src : src?.src || '';
    return React.createElement('img', { src: resolved, alt, className });
  },
}));

vi.mock('next/link', () => ({
  default: function Link({ href, children, ...props }) {
    return React.createElement('a', { href, ...props }, children);
  },
}));

vi.mock('next/font/google', () => ({
  Josefin_Sans: () => ({ className: 'josefin' }),
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/account',
  useRouter: () => ({ replace: vi.fn(), push: vi.fn(), refresh: vi.fn() }),
  useSearchParams: () => new URLSearchParams('capacity=all'),
  notFound: vi.fn(),
  redirect: vi.fn(),
}));

vi.mock('react-dom', async () => {
  const actual = await vi.importActual('react-dom');
  return {
    ...actual,
    useFormStatus: () => ({ pending: false }),
  };
});

vi.mock('next/cache', () => ({
  unstable_noStore: vi.fn(),
  revalidatePath: vi.fn(),
}));

vi.mock('react-day-picker', () => ({
  DayPicker: function DayPicker({ numberOfMonths, className }) {
    return React.createElement('div', {
      'data-testid': 'day-picker',
      'data-months': String(numberOfMonths),
      className,
    });
  },
}));

vi.mock('react-day-picker/dist/style.css', () => ({}));

vi.mock('@/app/_lib/auth', () => ({
  auth: vi.fn(async () => null),
  signIn: vi.fn(),
  signOut: vi.fn(),
}));

vi.mock('@/app/_lib/actions', () => ({
  createBooking: vi.fn(),
  deleteBooking: vi.fn(),
  updateGuest: vi.fn(),
  updateBooking: vi.fn(),
  signOutAction: vi.fn(),
  signInAction: vi.fn(),
  deleteReservation: vi.fn(),
}));

vi.mock('@/app/_lib/data-service', () => ({
  getCabins: vi.fn(async () => [
    {
      id: 1,
      name: '001',
      maxCapacity: 4,
      regularPrice: 250,
      discount: 50,
      image: '/cabin.jpg',
      description: 'A cozy cabin in the woods with a private deck.',
    },
  ]),
  getCabin: vi.fn(async () => ({
    id: 1,
    name: '001',
    maxCapacity: 4,
    regularPrice: 250,
    discount: 50,
    image: '/cabin.jpg',
    description: 'A cozy cabin in the woods with a private deck.',
  })),
  getSettings: vi.fn(async () => ({
    minBookingLength: 3,
    maxBookingLength: 30,
  })),
  getBookedDatesByCabinId: vi.fn(async () => []),
}));
