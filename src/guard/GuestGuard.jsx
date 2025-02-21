import { Navigate, Outlet } from "react-router";

const GuestGuard = ({ isAuthenticated }) => {
    return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export default GuestGuard;
