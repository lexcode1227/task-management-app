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
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/profile" element={<Profile />} />
            </Route>
        </Routes>
    </BrowserRouter>
    )
}

export default Router;