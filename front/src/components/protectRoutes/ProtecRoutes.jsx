import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

export const ProtectRoutes = ({ children, isAllowed }) => {

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAllowed) {
          navigate("/ingresar")
        }
      }, [isAllowed, navigate]);
    
      return children ? children : <Outlet/>
    }