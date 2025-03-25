import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { JSX } from 'react';

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  const { user } = useAuth();
  
  return user ? (
    <>
      {element}
      <Outlet /> {/* ✅ Allow rendering of nested routes */}
    </>
  ) : (
    <Navigate to="/login" />
  );
};


export default PrivateRoute;
