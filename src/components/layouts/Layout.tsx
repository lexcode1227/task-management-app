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
    <main className="flex h-screen w-full md:gap-8 bg-color_neutral_5 p-4 md:p-8 pb-0">
      <Toaster closeButton position="bottom-right" richColors />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        handleSidebarToggle={handleSidebarToggle}
      />
      <section className="flex w-full md:w-[calc(100vw-360px)] flex-col">
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
