import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const protectedRoute: React.FC<{children: JSX.Element}> = ({children}) => {
    const {user}= useAuth();

    if (!user) {
        return <Navigate to="/login" />
    }

    return children;
};

export default protectedRoute;