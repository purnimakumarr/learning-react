import Navigation from '@/app/_components/Navigation';
import Logo from '@/app/_components/Logo';

function Header() {
  return (
    <header className='border-b border-primary-900 px-4 py-4 sm:px-6 lg:px-8 lg:py-5'>
      <div className='flex flex-col items-center gap-4 sm:flex-row sm:justify-between sm:items-center sm:gap-6 max-w-7xl mx-auto w-full'>
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
