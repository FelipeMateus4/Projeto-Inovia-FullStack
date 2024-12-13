import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ element }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return isAuthenticated ? element : <Navigate to="/auth" replace />;
};

export default PrivateRoute;
