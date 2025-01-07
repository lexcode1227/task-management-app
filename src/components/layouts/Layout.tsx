import { useState } from "react";
import { Outlet } from "react-router";
import { Toaster } from "sonner";
import Searchbar from "../ui/Searchbar";
import Sidebar from "../ui/Sidebar";
import Topbar from "../ui/Topbar";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <main className="flex h-screen w-full bg-color_neutral_5 p-4 pb-0 md:gap-8 md:p-8">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          handleSidebarToggle={handleSidebarToggle}
        />
        <section className="flex w-full flex-col md:w-[calc(100vw-328px)]">
          <Searchbar />
          <Topbar />
          <section className="mt-4">
            <Outlet />
          </section>
        </section>
      </main>
      <Toaster closeButton position="bottom-right" richColors />
    </>
  );
};

export default Layout;
