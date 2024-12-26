import { ApolloProvider } from "@apollo/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import { client } from "./apollo";
import Sidebar from "./components/ui/Sidebar";
import Tasks from "./pages/Tasks";

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <main className="h-screen bg-color_neutral_5 flex p-8">
          <Sidebar/>
          <Routes>
            <Route path="/" element={<Navigate to={"/dashboard"}/>} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/task/:id" element={<Dashboard />} />
          </Routes>
        </main>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
