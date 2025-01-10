import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "../components/layouts/Layout";
import Tasks from "../pages/Tasks";
import Profile from "../pages/Profile";
import Dashboard from "../pages/Dashboard";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<Dashboard />} index />
          <Route element={<Tasks />} path="/tasks" />
          <Route element={<Profile />} path="/profile" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
