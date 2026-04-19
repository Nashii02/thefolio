import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// PublicRoute: redirects logged-in users away from login/register pages
// If user is authenticated, redirects to /home
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return null; // Wait for auth check to complete
  if (user) return <Navigate to='/home' replace />;
  return children;
};

export default PublicRoute;
