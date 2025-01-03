import Searchbar from "../ui/Searchbar";
import Sidebar from "../ui/Sidebar";
import Topbar from "../ui/Topbar";
import { Toaster } from "sonner";

interface Props {
  children: React.ReactNode;
}

const Layout = ({children}: Props) => {
  return (
    <main className="flex h-screen w-full gap-8 bg-color_neutral_5 p-8 pb-0">
      <Toaster richColors closeButton position="bottom-right"/>
      <Sidebar />
      <section className="flex w-[calc(100vw-328px)] flex-col">
        <Searchbar />
        <Topbar />
        <section className="mt-4">{children}</section>
      </section>
    </main>
  );
};

export default Layout;
