import { Outlet } from "react-router";
import Searchbar from "../ui/Searchbar";
import Sidebar from "../ui/Sidebar";
import Topbar from "../ui/Topbar";
import { Toaster } from "sonner";

const Layout = () => {
  return (
    <main className="flex h-screen w-full gap-8 bg-color_neutral_5 p-8 pb-0">
      <Toaster richColors closeButton position="bottom-right"/>
      <Sidebar />
      <section className="flex w-[calc(100vw-360px)] flex-col">
        <Searchbar />
        <Topbar />
        <section className="mt-4">
          <Outlet />
        </section>
      </section>
    </main>
  );
};

export default Layout;
