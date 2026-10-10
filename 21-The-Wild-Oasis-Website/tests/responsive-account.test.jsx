import { useEffect } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ReservationCard from '@/app/_components/ReservationCard';
import ReservationReminder from '@/app/_components/ReservationReminder';
import {
  ReservationProvider,
  useReservation,
} from '@/app/_components/ReservationContext';
import UpdateProfileForm from '@/app/_components/UpdateProfileForm';
import UpdateReservationForm from '@/app/_components/UpdateReservationForm';
import AccountLayout from '@/app/account/layout';
import { tokens } from './class-names';
import { booking, guest } from './fixtures';

function RememberDates({ children }) {
  const { setRange } = useReservation();

  useEffect(() => {
    setRange({
      from: new Date('2030-06-01'),
      to: new Date('2030-06-06'),
    });
  }, [setRange]);

  return children;
}

describe('guest area', () => {
  it('turns the sidebar into a horizontal nav on phones and restores it on tablets', () => {
    const { container } = render(
      <AccountLayout>
        <p>Guest home</p>
      </AccountLayout>,
    );
    const layout = container.firstElementChild;
    const list = screen.getByRole('list');
    const nav = list.closest('nav');
    const profile = screen.getByRole('link', { name: /guest profile/i });
    const signOut = screen.getByRole('button', { name: /sign out/i });

    expect(tokens(layout)).toContain('grid-cols-1');
    expect(tokens(layout)).toContain('md:grid-cols-[14rem_1fr]');
    expect(tokens(layout)).toContain('lg:grid-cols-[16rem_1fr]');
    expect(tokens(layout)).not.toContain('grid-cols-[16rem_1fr]');

    expect(tokens(nav)).toContain('border-b');
    expect(tokens(nav)).toContain('md:border-r');
    expect(tokens(nav)).not.toContain('border-r');

    expect(tokens(list)).toContain('flex-row');
    expect(tokens(list)).toContain('md:flex-col');
    expect(tokens(list)).toContain('overflow-x-auto');
    expect(tokens(list)).not.toContain('flex-col');
    expect(tokens(profile)).toContain('whitespace-nowrap');

    expect(tokens(signOut)).toContain('w-auto');
    expect(tokens(signOut)).toContain('md:w-full');
    expect(tokens(signOut)).not.toContain('w-full');
  });

  it('stacks a reservation card on phones and keeps the action column beside it on larger screens', () => {
    render(<ReservationCard booking={booking} onDelete={() => {}} />);
    const heading = screen.getByRole('heading', { name: /nights in cabin 001/i });
    const card = heading.closest('div.border');
    const edit = screen.getByRole('link', { name: /edit/i });
    const actions = edit.parentElement;
    const booked = screen.getByText(/booked/i);

    expect(tokens(card)).toContain('flex-col');
    expect(tokens(card)).toContain('sm:flex-row');
    expect(tokens(heading.parentElement)).toContain('flex-wrap');
    expect(tokens(screen.getByText('$1000').parentElement)).toContain('flex-wrap');
    expect(tokens(booked)).toContain('w-full');
    expect(tokens(booked)).toContain('sm:ml-auto');
    expect(tokens(booked)).not.toContain('ml-auto');

    expect(tokens(actions)).toContain('flex-row');
    expect(tokens(actions)).toContain('sm:flex-col');
    expect(tokens(actions)).not.toContain('flex-col');
    expect(tokens(actions)).toContain('w-full');
    expect(tokens(actions)).toContain('sm:w-[100px]');
    expect(tokens(actions)).not.toContain('w-[100px]');
  });

  it('uses compact form padding on phones', () => {
    const { container } = render(
      <UpdateProfileForm guest={guest}>
        <select id='nationality' />
      </UpdateProfileForm>,
    );
    const profileForm = container.querySelector('form');

    expect(tokens(profileForm)).toContain('px-4');
    expect(tokens(profileForm)).toContain('sm:px-8');
    expect(tokens(profileForm)).toContain('lg:px-12');
    expect(tokens(profileForm)).not.toContain('px-12');

    const { container: reservationContainer } = render(
      <UpdateReservationForm
        maxCapacity={4}
        bookingId='10'
        numGuests={2}
        observations='Late arrival'
      />,
    );
    const reservationForm = reservationContainer.querySelector('form');

    expect(tokens(reservationForm)).toContain('px-4');
    expect(tokens(reservationForm)).toContain('sm:px-8');
    expect(tokens(reservationForm)).toContain('lg:px-12');
    expect(tokens(reservationForm)).not.toContain('px-12');
  });

  it('keeps the date reminder inside the phone screen', async () => {
    render(
      <ReservationProvider>
        <RememberDates>
          <ReservationReminder />
        </RememberDates>
      </ReservationProvider>,
    );

    const note = await screen.findByText(/forget to reserve/i);
    const banner = note.closest('div');

    expect(tokens(banner)).toContain('left-4');
    expect(tokens(banner)).toContain('right-4');
    expect(tokens(banner)).toContain('sm:left-1/2');
    expect(tokens(banner)).toContain('sm:right-auto');
    expect(tokens(banner)).toContain('sm:-translate-x-1/2');
    expect(tokens(banner)).not.toContain('left-1/2');
    expect(tokens(banner)).toContain('text-sm');
    expect(tokens(banner)).toContain('sm:text-base');
    expect(tokens(banner)).toContain('rounded-2xl');
    expect(tokens(banner)).toContain('sm:rounded-full');
  });
});
