import '@/app/_styles/globals.css';
import { Josefin_Sans } from 'next/font/google';
import Header from './_components/Header';
import { ReservationProvider } from './_components/ReservationContext';

const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: {
    template: '%s / The Wild Oasis',
    default: 'Welcome / The Wild Oasis',
  },
  description:
    'Luxurious cabin hotel located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests',
};

function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`bg-primary-950 text-primary-100 min-h-screen flex flex-col ${josefin.className} relative`}
      >
        <Header />

        <div className='flex-1 px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12 grid min-w-0'>
          <main className='max-w-7xl mx-auto w-full min-w-0'>
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}

export default RootLayout;
