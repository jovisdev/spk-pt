import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles }) => {
    const { isAuthenticated, statusJabatan } = useSelector((state) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/signin" replace />;
    }

    if (!allowedRoles.includes(statusJabatan)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default PrivateRoute;