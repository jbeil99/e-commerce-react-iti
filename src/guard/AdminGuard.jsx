import { Navigate, Outlet } from "react-router";

const AdminGuard = ({ isAdmin }) => {
    return isAdmin ? <Outlet /> : <Navigate to={'/'} />;
};

export default AdminGuard;
