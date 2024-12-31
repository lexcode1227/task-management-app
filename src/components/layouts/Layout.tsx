import Searchbar from "../ui/Searchbar";
import Sidebar from "../ui/Sidebar";
import Topbar from "../ui/Topbar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({children}: Props) => {
  return (
    <main className="flex gap-8 h-screen w-full bg-color_neutral_5 p-8 pb-0">
      <Sidebar/>
      <section className="w-[calc(100vw-328px)] flex flex-col">
          <Searchbar/>
          <Topbar/>
          <section className="mt-4">
              {children}
          </section>
      </section>
    </main>
  );
};

export default Layout;
