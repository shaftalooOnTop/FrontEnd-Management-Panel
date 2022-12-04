import { padding } from "@mui/system";
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import './appLayout.css';

const AppLayout = () => {
    return <div className="appLay">
        <Sidebar />
        <Outlet />
    </div>;
};

export default AppLayout;