
import React,{ useState } from "react";
import { Link, useNavigate, useLocation  } from "react-router-dom";
import { getAuth,createUserWithEmailAndPassword } from 'firebase/auth';
import image from '../../images/pattern.png'

import { addUserToDatabase } from "../../auth/addUserToDb";
import PasswordInput from "../../auth/PasswordInput";

export function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSignUp  = (event) => {
    event.preventDefault(); // Ngăn không cho form thực hiện hành động mặc định của nó (gửi dữ liệu form)
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      // const role = location.pathname.includes("admin/api") ? "admin" : "user";
    createUserWithEmailAndPassword(auth, email, password, role)
      .then((userCredential) => {
        const user = userCredential.user;
        // Optionally, call a function to store user info in Realtime Database
        addUserToDatabase(user.uid, email, role);
        navigate('/');
      })
      .catch((error) => {
        // Xử lý các lỗi xuất hiện, ví dụ như email không hợp lệ hoặc mật khẩu sai
        alert('Đăng ký thất bại: ' + error.message);
      });
} catch (error) {
    setError(error.message);
  }
};
const handlePasswordChange = (event) => {
  setPassword(event.target.value);
};

const handleConfirmPasswordChange = (event) => {
  setConfirmPassword(event.target.value);
};


  return (
    <div>
      <section className="m-8 flex">
              <div className="w-2/5 h-full hidden lg:block">
          <img
            src={image}
            className="h-full w-full object-cover rounded-3xl"
          />
        </div>
        <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
          <div className="text-center">
            <h2 className="font-bold mb-4 text-4xl">Thêm Tài Khoản Admin</h2>
            <h3 color="blue-gray" className="text-lg font-normal">Vui lòng điền thông tin admin mới.</h3>
          </div>

          <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSignUp}>
          <div className="mb-1 flex flex-col gap-6">
              <label htmlFor="email" color="blue-gray" className="-mb-3 font-medium">
                Email
              </label>
              <input
              type="email" id="email" name="email" required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
                placeholder="name@mail.com"
                className=" border p-3 rounded-lg focus:!border-t-gray-900"
               
              />
              <label htmlFor="password" color="blue-gray" className="-mb-3 font-medium">
                Mật khẩu
              </label>
              <PasswordInput
                value={password}
                onChange={handlePasswordChange}
              />

              <label htmlFor="password" color="blue-gray" className="-mb-3 font-medium">
                Xác nhận mật khẩu
              </label>
             <PasswordInput
             value={confirmPassword}
             onChange={handleConfirmPasswordChange}
             />
            <label htmlFor="role" color="blue-gray" className="-mb-3 font-medium">
              Loại Tài Khoản
            </label>
            <select
              id="role" name="role" required
              onChange={(e) => setRole(e.target.value)}
              value={role}
              className="border p-3 rounded-lg focus:!border-t-gray-900"
            >
              <option value="">---Loại tài khoản---</option>
              <option value="Admin">Admin</option>
              <option value="Nhân viên nhập">Nhân viên nhập</option>
              <option value="Nhân viên xuất">Nhân viên xuất</option>
            </select>
            </div>
          
            <button type="submit" className="mt-6 bg-black text-white  text-center px-[10rem] py-3 rounded-lg"   >
              Đăng Ký Ngay
            </button>
            {error && <p className="text-red-500">{error}</p>}
      
            <div variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
              Bạn đã có tài khoản?
              <Link to="/" className="text-gray-900 ml-1 underline">Đăng nhập</Link>
            </div> 
          </form>
  
        </div>
      </section>

    </div>
  );
}

export default SignUp;
