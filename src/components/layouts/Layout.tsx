import { useEffect } from "react";
import { Outlet } from "react-router";
import { Toaster } from "sonner";
import Searchbar from "../ui/Searchbar";
import Sidebar from "../ui/Sidebar";
import Topbar from "../ui/Topbar";
import { useGetProfileInformationQuery } from "../../gql/graphql";
import { useAppStore } from "../../store/store";

const Layout = () => {
  const isSidebarOpen = useAppStore((state) => state.isSidebarOpen);
  const setIsSidebarOpen = useAppStore((state) => state.setIsSidebarOpen);  
  const setUser = useAppStore((state) => state.setUser);
  const { data, loading } = useGetProfileInformationQuery();

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (data?.profile) {
      setUser(data?.profile);
    } 
  }, [data]);

  return (
    <>
      <main className="flex h-screen w-full bg-color_neutral_5 p-4 pb-0 md:gap-8 md:p-8">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          handleSidebarToggle={handleSidebarToggle}
          loading={loading}
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
