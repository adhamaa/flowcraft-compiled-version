import ColapsableMenu from "./_components/ColapsableMenu";
import HomeContent from "./_components/Content";

function Layout() {
  return (
    <div className='flex gap-5'>
      <ColapsableMenu />
      <HomeContent />
    </div>
  );
}

export default Layout;