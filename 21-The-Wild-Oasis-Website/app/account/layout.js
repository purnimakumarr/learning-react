import SideNavigation from '../_components/SideNavigation';

function Layout({ children }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-[14rem_1fr] lg:grid-cols-[16rem_1fr] gap-6 md:gap-8 lg:gap-12 items-start'>
      <SideNavigation />
      <div className='py-1 min-w-0'>{children}</div>
    </div>
  );
}

export default Layout;
