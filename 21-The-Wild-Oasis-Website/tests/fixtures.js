export const cabin = {
  id: 1,
  name: '001',
  maxCapacity: 4,
  regularPrice: 250,
  discount: 50,
  image: '/cabin.jpg',
  description:
    'A cozy cabin hidden in the Dolomites with a private hot tub, a fireplace, and a wide view of the dark pine forest under the stars.',
};

export const booking = {
  id: 10,
  guestId: 1,
  startDate: '2030-06-01',
  endDate: '2030-06-06',
  numNights: 5,
  totalPrice: 1000,
  numGuests: 2,
  status: 'unconfirmed',
  created_at: '2026-01-01T10:00:00.000Z',
  cabins: { name: '001', image: '/cabin.jpg' },
};

export const guest = {
  fullName: 'Alex Guest',
  email: 'alex@example.com',
  nationality: 'Italy',
  nationalID: 'ABC123',
  countryFlag: '/flag.png',
};
