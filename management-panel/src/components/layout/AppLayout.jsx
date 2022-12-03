import { padding } from "@mui/system";
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";

const AppLayout = () => {
    return <div style={{
        padding: '0px 0px 0px 228px'
    }}>
        <Sidebar />
        <Outlet />
    </div>;
};

export default AppLayout;