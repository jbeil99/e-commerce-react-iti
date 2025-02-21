import { Navigate, Outlet } from "react-router";

const AuthGuard = ({ isAuthenticated }) => {
    return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export default AuthGuard;
