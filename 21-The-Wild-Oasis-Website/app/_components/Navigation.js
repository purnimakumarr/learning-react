import Link from 'next/link';
import { auth } from '../_lib/auth';

export default async function Navigation() {
  const session = await auth();

  return (
    <nav className='z-10 text-base sm:text-lg lg:text-xl w-full sm:w-auto'>
      <ul className='flex flex-wrap gap-4 sm:gap-8 lg:gap-16 items-center justify-center sm:justify-end'>
        <li>
          <Link
            href='/cabins'
            className='hover:text-accent-400 transition-colors'
          >
            Cabins
          </Link>
        </li>
        <li>
          <a href='/about' className='hover:text-accent-400 transition-colors'>
            About
          </a>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href='/account'
              className='hover:text-accent-400 transition-colors flex items-center gap-4'
            >
              <img
                className='h-8 rounded-full'
                src={session.user.image}
                alt={session.user.name}
                referrerPolicy='no-referrer'
              />
              <span>Guest area</span>
            </Link>
          ) : (
            <Link
              href='/account'
              className='hover:text-accent-400 transition-colors'
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
