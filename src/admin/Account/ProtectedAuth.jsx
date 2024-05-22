import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Tạo Context để cung cấp và sử dụng trạng thái xác thực
const AuthContext = createContext(null);


// Component Provider để xử lý trạng thái xác thực và phản hồi tương ứng
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);


  if (loading) {
    return  (
      <div className=' relative w-full h-full bg-[#00000010]'>
      <div className='absolute -translate-x-1/2 translate-y-full left-1/2 top-1/2'>
         <div className='  animate-spin w-20 h-20 border-[7px] rounded-full border-[#1dc071] border-t-transparent border-b-transparent'>
         </div>
      </div>
    </div>
    )
  }

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

// HOC để bảo vệ route, chỉ cho phép truy cập khi người dùng đã đăng nhập
export function withAuthProtected(Component) {
  const ProtectedComponent = (props) => {
    const user = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      // Ensure the protection is only applied to exactly "/admin/api/news"
      if (!user && location.pathname === '/admin/api/news') {
        navigate('/sign-in', { state: { from: location } });
      }
    }, [user, navigate, location.pathname]); // Add location.pathname to dependencies

    return user ? <Component {...props} /> : null;
  };

  return ProtectedComponent;
}

// Hook để sử dụng thông tin người dùng xác thực trong các component khác
export function useAuth() {
  return useContext(AuthContext);
}
