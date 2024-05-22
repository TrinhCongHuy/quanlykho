import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { match } from 'path-to-regexp';

const PageTitleManager = () => {
  const location = useLocation();
  const titleMap = {
    '/admin': 'Quản lý kho Go',
    '/profile': 'GO | Thông tin cá nhân',
    '/lien-he': 'GO | Liên Hệ',
    '/sign-in': 'GO | Đăng Nhập',
    '/sign-up': 'GO | Đăng Ký',
    '/admin/api/news': 'Admin || Tuệ Tâm',
    '/admin/api/sign-up': 'Admin || Register',
  };

  useEffect(() => {
    const updateTitle = () => {
      let title = '404'; // Tiêu đề mặc định khi không khớp bất kỳ đường dẫn nào

      // Kiểm tra xem có khớp với bất kỳ đường dẫn nào trong titleMap không
      //'/dich-vu/ads' || '/dich-vu/payment'||
      for (let path in titleMap) {
        const matcher = match(path, { decode: decodeURIComponent, end: path ===  '/News/:slug' ? false : true });
        if (matcher(location.pathname)) {
          title = titleMap[path];
          break;
        }
      }
      document.title = title;
    };

    updateTitle();
  }, [location]); // Phụ thuộc vào location

  return null;
};

export default PageTitleManager;
