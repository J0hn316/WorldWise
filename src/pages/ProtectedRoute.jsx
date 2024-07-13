import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/FakeAuthContext';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) nav('/');
  }, [isAuthenticated, nav]);

  return isAuthenticated ? children : null;
};
export default ProtectedRoute;
