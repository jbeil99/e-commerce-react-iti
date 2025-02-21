import { Navigate, Outlet } from "react-router";

const AdminGuard = ({ isAdmin }) => {
    return isAdmin ? <Navigate to={'/'} /> : <Outlet />;
};

export default AdminGuard;
