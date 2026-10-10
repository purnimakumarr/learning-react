import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Cabin from '@/app/_components/Cabin';
import CabinList from '@/app/_components/CabinList';
import DateSelector from '@/app/_components/DateSelector';
import Filter from '@/app/_components/Filter';
import LoginMessage from '@/app/_components/LoginMessage';
import Reservation from '@/app/_components/Reservation';
import ReservationForm from '@/app/_components/ReservationForm';
import { ReservationProvider } from '@/app/_components/ReservationContext';
import CabinsPage from '@/app/cabins/page';
import CabinDetailPage from '@/app/cabins/[cabinId]/page';
import { tokens } from './class-names';
import { findElements } from './element-tree';
import { cabin } from './fixtures';
import { setViewport } from './viewport';

const root = path.dirname(fileURLToPath(import.meta.url));

function renderSelector() {
  return render(
    <ReservationProvider>
      <DateSelector
        settings={{ minBookingLength: 3, maxBookingLength: 30 }}
        bookedDates={[]}
        cabin={{ regularPrice: 250, discount: 50 }}
      />
    </ReservationProvider>,
  );
}

describe('cabins page', () => {
  it('uses a smaller heading and a filter that can wrap to two columns on phones', () => {
    const page = CabinsPage({ searchParams: { capacity: 'all' } });
    const heading = findElements(page, (node) => node.type === 'h1')[0];
    const intro = findElements(page, (node) => node.type === 'p')[0];

    expect(tokens(heading)).toContain('text-3xl');
    expect(tokens(heading)).toContain('sm:text-4xl');
    expect(tokens(heading)).not.toContain('text-4xl');
    expect(tokens(intro)).toContain('text-base');
    expect(tokens(intro)).toContain('sm:text-lg');
    expect(tokens(intro)).not.toContain('text-lg');

    render(<Filter />);
    const filter = screen.getByRole('button', { name: /all cabins/i }).parentElement;
    const button = screen.getByRole('button', { name: /8—12 guests/i });

    expect(tokens(filter)).toEqual(
      expect.arrayContaining(['flex', 'flex-wrap', 'w-full', 'sm:w-auto']),
    );
    expect(tokens(button)).toEqual(
      expect.arrayContaining([
        'basis-1/2',
        'sm:basis-auto',
        'text-sm',
        'sm:text-base',
        'px-3',
        'sm:px-5',
      ]),
    );
    expect(tokens(button)).not.toContain('px-5');
  });

  it('shows one cabin card per row until large screens', async () => {
    const { container } = render(await CabinList({ filter: 'all' }));
    const grid = container.firstElementChild;
    const card = grid.firstElementChild;

    expect(tokens(grid)).toContain('grid-cols-1');
    expect(tokens(grid)).toContain('lg:grid-cols-2');
    expect(tokens(grid)).not.toContain('md:grid-cols-2');
    expect(tokens(card)).toContain('flex-col');
    expect(tokens(card)).toContain('sm:flex-row');
    expect(tokens(card)).not.toContain('flex-row');

    const photo = card.querySelector('img');
    expect(tokens(photo.parentElement)).toContain('h-52');
    expect(tokens(photo.parentElement)).toContain('sm:flex-1');
    expect(tokens(screen.getByText('$200').parentElement)).toContain('flex-wrap');
  });
});

describe('cabin detail', () => {
  it('stacks the photo and description until large screens and keeps the overlap for laptops', () => {
    const { container } = render(<Cabin cabin={cabin} />);
    const layout = container.firstElementChild;
    const media = layout.firstElementChild;
    const heading = screen.getByRole('heading', { name: /cabin 001/i });

    expect(tokens(layout)).toContain('grid-cols-1');
    expect(tokens(layout)).toContain('lg:grid-cols-[3fr_4fr]');
    expect(tokens(layout)).not.toContain('grid-cols-[3fr_4fr]');
    expect(tokens(layout)).toContain('px-4');
    expect(tokens(layout)).toContain('xl:px-10');
    expect(tokens(layout)).not.toContain('px-10');

    expect(tokens(media)).toContain('h-64');
    expect(tokens(media)).toContain('lg:h-auto');
    expect(tokens(media)).not.toContain('scale-[1.15]');
    expect(tokens(media)).toContain('xl:scale-[1.15]');
    expect(tokens(media)).not.toContain('-translate-x-3');
    expect(tokens(media)).toContain('xl:-translate-x-3');

    expect(tokens(heading)).toContain('text-4xl');
    expect(tokens(heading)).toContain('xl:text-7xl');
    expect(tokens(heading)).not.toContain('text-7xl');
    expect(tokens(heading)).not.toContain('translate-x-[-254px]');
    expect(tokens(heading)).toContain('xl:translate-x-[-254px]');
    expect(tokens(heading)).not.toContain('w-[150%]');
    expect(tokens(heading)).toContain('xl:w-[150%]');
  });

  it('shrinks the reservation heading on phones', async () => {
    const page = await CabinDetailPage({ params: { cabinId: '1' } });
    const heading = findElements(page, (node) => node.type === 'h2')[0];

    expect(tokens(heading)).toContain('text-3xl');
    expect(tokens(heading)).toContain('sm:text-4xl');
    expect(tokens(heading)).toContain('lg:text-5xl');
    expect(tokens(heading)).not.toContain('text-5xl');
  });

  it('places the calendar and the booking form in one column until laptop width', async () => {
    const { container } = render(
      <ReservationProvider>{await Reservation({ cabin })}</ReservationProvider>,
    );

    expect(tokens(container.firstElementChild)).toContain('grid-cols-1');
    expect(tokens(container.firstElementChild)).toContain('xl:grid-cols-2');
    expect(tokens(container.firstElementChild)).not.toContain('grid-cols-2');
  });

  it('shows one calendar month on a phone and two months from tablet width up', () => {
    setViewport(390);
    const phone = renderSelector();
    expect(screen.getByTestId('day-picker')).toHaveAttribute('data-months', '1');
    phone.unmount();

    setViewport(768);
    const tablet = renderSelector();
    expect(screen.getByTestId('day-picker')).toHaveAttribute('data-months', '2');
    tablet.unmount();

    setViewport(1280);
    renderSelector();
    expect(screen.getByTestId('day-picker')).toHaveAttribute('data-months', '2');
  });

  it('lets the nightly price wrap instead of clipping it to one fixed row', () => {
    setViewport(390);
    renderSelector();
    const nightly = screen.getByText('/night');
    const priceRow = nightly.closest('div');
    const summary = priceRow.parentElement;

    expect(tokens(summary)).toContain('flex-col');
    expect(tokens(summary)).toContain('sm:flex-row');
    expect(tokens(summary)).toContain('sm:h-[72px]');
    expect(tokens(summary)).not.toContain('h-[72px]');
    expect(tokens(priceRow)).toContain('flex-wrap');
    expect(tokens(screen.getByTestId('day-picker').parentElement)).toContain(
      'overflow-x-auto',
    );
    expect(tokens(screen.getByTestId('day-picker'))).toContain('max-w-full');
  });

  it('shrinks the day cells so one month fits on a narrow phone', () => {
    const css = readFileSync(path.join(root, '../app/_styles/globals.css'), 'utf8');

    expect(css).toMatch(/max-width:\s*100%/);
    expect(css).toMatch(/@media\s*\(\s*max-width:\s*400px\s*\)/);
    expect(css).toMatch(/--rdp-day-width:\s*30px/);
    expect(css).toMatch(/--rdp-day-height:\s*30px/);
  });

  it('pads the signed-out reservation message on a phone', () => {
    render(<LoginMessage />);
    const message = screen.getByText(/to reserve this/i);

    expect(tokens(message.parentElement)).toContain('px-4');
    expect(tokens(message)).toContain('text-lg');
    expect(tokens(message)).toContain('sm:text-xl');
    expect(tokens(message)).not.toContain('text-xl');
  });

  it('reduces the booking form padding and stacks the guest header on phones', () => {
    const { container } = render(
      <ReservationProvider>
        <ReservationForm
          cabin={cabin}
          user={{ name: 'Alex Guest', image: '/guest.jpg' }}
        />
      </ReservationProvider>,
    );
    const form = container.querySelector('form');
    const signedIn = screen.getByText(/logged in as/i).parentElement;

    expect(tokens(form)).toContain('px-4');
    expect(tokens(form)).toContain('sm:px-8');
    expect(tokens(form)).toContain('lg:px-16');
    expect(tokens(form)).not.toContain('px-16');
    expect(tokens(form)).toContain('text-base');
    expect(tokens(form)).toContain('sm:text-lg');

    expect(tokens(signedIn)).toContain('flex-col');
    expect(tokens(signedIn)).toContain('sm:flex-row');
    expect(tokens(signedIn)).toContain('px-4');
    expect(tokens(signedIn)).toContain('lg:px-16');
    expect(tokens(signedIn)).not.toContain('px-16');
  });
});
