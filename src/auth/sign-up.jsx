import {
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { Link, useNavigate, useLocation  } from "react-router-dom";
import { getAuth,createUserWithEmailAndPassword } from 'firebase/auth';
import image from '../images/pattern.png'
import twitter from '../images/twitter-logo.svg'

import { addUserToDatabase } from "./addUserToDb";
import PasswordInput from "./PasswordInput";

export function SignUpClient() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
      const role = location.pathname.includes("admin/api") ? "admin" : "user";
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Optionally, call a function to store user info in Realtime Database
        addUserToDatabase(user.uid, email, role);
        navigate(role === "admin" ? '/admin/api/sign-in' : '/sign-in');
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
            <Typography variant="h2" className="font-bold mb-4">Tham Gia Ngay</Typography>
            <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Vui lòng điền thông tin để đăng ký.</Typography>
          </div>

          <form onSubmit={handleSignUp} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
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
            </div>
           <div className="flex">
              <Checkbox
                containerProps={{ className: "-ml-2.5" }}
              />
              
              <Typography
                    variant="small"
                    color="gray"
                    className="flex items-center justify-start font-medium"
                  >
                    Tôi đồng ý với&nbsp;
                    <a
                      href="#"
                      className="font-normal text-black transition-colors hover:text-gray-900 underline"
                    >
                      Điều khoản và Chính sách
                    </a>
                  </Typography>
           </div>
            <Button type="submit" className="mt-6 bg-black" fullWidth >
              Đăng Ký Ngay
            </Button>
            {error && <p className="text-red-500">{error}</p>}
            <div className="space-y-4 mt-8">
              <Button size="lg" color="white" className="flex items-center gap-2 justify-center shadow-md py-4" fullWidth>
                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_1156_824)">
                    <path d="M16.3442 8.18429C16.3442 7.64047 16.3001 7.09371 16.206 6.55872H8.66016V9.63937H12.9813C12.802 10.6329 12.2258 11.5119 11.3822 12.0704V14.0693H13.9602C15.4741 12.6759 16.3442 10.6182 16.3442 8.18429Z" fill="#4285F4" />
                    <path d="M8.65974 16.0006C10.8174 16.0006 12.637 15.2922 13.9627 14.0693L11.3847 12.0704C10.6675 12.5584 9.7415 12.8347 8.66268 12.8347C6.5756 12.8347 4.80598 11.4266 4.17104 9.53357H1.51074V11.5942C2.86882 14.2956 5.63494 16.0006 8.65974 16.0006Z" fill="#34A853" />
                    <path d="M4.16852 9.53356C3.83341 8.53999 3.83341 7.46411 4.16852 6.47054V4.40991H1.51116C0.376489 6.67043 0.376489 9.33367 1.51116 11.5942L4.16852 9.53356Z" fill="#FBBC04" />
                    <path d="M8.65974 3.16644C9.80029 3.1488 10.9026 3.57798 11.7286 4.36578L14.0127 2.08174C12.5664 0.72367 10.6469 -0.0229773 8.65974 0.000539111C5.63494 0.000539111 2.86882 1.70548 1.51074 4.40987L4.1681 6.4705C4.8001 4.57449 6.57266 3.16644 8.65974 3.16644Z" fill="#EA4335" />
                  </g>
                  <defs>
                    <clipPath id="clip0_1156_824">
                      <rect width="16" height="16" fill="white" transform="translate(0.5)" />
                    </clipPath>
                  </defs>
                </svg>
                <span>Đăng nhập bằng Google</span>
              </Button>
              <Button size="lg" color="white" className="flex items-center gap-2 justify-center shadow-md py-4" fullWidth>
                <img src={twitter} height={24} width={24} alt="" />
                <span>Đăng nhập bằng Twitter</span>
              </Button>
            </div>
            <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
              Bạn đã có tài khoản?
              <Link to="/sign-in" className="text-gray-900 ml-1 underline">Đăng nhập</Link>
            </Typography>
          </form>
  
        </div>
      </section>
    </div>
  );
}

export default SignUpClient;
