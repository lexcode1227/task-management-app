import Searchbar from "../ui/Searchbar";
import Sidebar from "../ui/Sidebar";
import Topbar from "../ui/Topbar";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FunctionComponent<Props> = (props: Props) => {
  return <main className="flex gap-8 h-screen w-full bg-color_neutral_5 p-8">
    <Sidebar/>
    <section className="w-full">
        <Searchbar/>
        <Topbar/>
        <section className="w-full mt-4">
            {props.children}
        </section>
    </section>
  </main>;
};

export default Layout;
