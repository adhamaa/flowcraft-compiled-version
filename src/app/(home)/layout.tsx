import ColapsableMenu from "./_components/ColapsableMenu";
import HomeContent from "./_components/Content";
import Header from "./_components/Header";

function Layout() {
  return (
    <div className='grid grid-cols-[20rem_auto] grid-rows-[4rem_auto] transition-all duration-300 h-screen'>
      <Header />
      <ColapsableMenu />
      <HomeContent />
    </div>
  );
}

export default Layout;