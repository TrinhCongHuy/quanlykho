import {
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

import { Link ,useNavigate} from "react-router-dom";
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../App.js';
import { getDatabase, ref, get } from "firebase/database";

import image from '../images/pattern.png'
import twitter from '../images/twitter-logo.svg'
import { addUserToDatabase } from "./addUserToDb";
import PasswordInput from "./PasswordInput.jsx";

function signInWithGoogle() {

  signInWithPopup(auth, googleProvider)
    .then((result) => {
      const user = result.user;
        // Optionally, call a function to store user info in Realtime Database
        addUserToDatabase(user);
      // Đăng nhập thành công, có thể lấy thông tin người dùng từ result.user
        //navigate('/', { replace: true }); 
      console.log(result.user);
    })
    .catch((error) => {
      // Xử lý các lỗi ở đây
      console.error(error);
    });
}

export function SignInClient() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSignIn = (event) => {
     event.preventDefault(); 
     
    // console.log("Form Submitted");
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User logged in:", userCredential.user);
        fetchUserInfo(userCredential.user.uid);
      })
      .catch((error) => {
        alert('Login failed: ' + error.message);
      });
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  function fetchUserInfo(uid) {
    const db = getDatabase();
    const userRef = ref(db, 'Users/' + uid);

    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const userInfo = snapshot.val();
        navigate(userInfo.auth === "admin" ? '/admin' : '/', { replace: true });
      } else {
        navigate('/', { replace: true }); // Default redirect if no specific role is found
      }
    }).catch((error) => {
      console.error("Error fetching user data:", error);
    });
  }
  
  return (
   <div>
      <section className="m-8 flex gap-4">
        <div className="w-full lg:w-3/5 mt-24" >
          <div className="text-center">
            <h2 variant="h2" className="font-bold mb-4 text-4xl">Đăng Nhập</h2>
            <h2 variant="paragraph" color="blue-gray" className="text-lg font-normal">Vui lòng nhập email và mật khẩu.</h2>
          </div>
          <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSignIn}>
            <div className="mb-1 flex flex-col gap-6">
              <label htmlFor="email" color="blue-gray" className="-mb-3 font-medium">
                Email
              </label>
             
              <input type="email" id="email" name="email" required
               className=" border p-3 rounded-lg focus:!border-t-gray-900"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />

              <label htmlFor="password" color="blue-gray" className="-mb-3 font-medium">
                Mật khẩu
              </label>
              <PasswordInput
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            
             <Button className="mt-6 bg-black" fullWidth type="submit">
              Đăng Nhập
            </Button> 
             
  
            <div className="flex items-center justify-between gap-2 mt-6">
              <div className=" flex">
                <Checkbox
                  containerProps={{ className: "-ml-2.5" }}
                />
                    <Typography
                      variant="small"
                      color="gray"
                      className="flex items-center justify-start font-medium"
                    >
                     Nhớ mật khẩu
                    </Typography>
              </div>
                
              <Typography variant="small" className=" underline font-medium text-gray-900">
                <a href="#">
                  Quên mật khẩu ?
                </a>
              </Typography>
            </div>
            </form>
           <div className="w-full lg:w-3/5 mt-24 mx-auto">
              <div className="space-y-4 mt-8">
                <Button onClick={signInWithGoogle} size="lg" color="white" className="flex items-center gap-2 justify-center shadow-md py-4" fullWidth>
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
           </div>
            <h3 variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
              Bạn chưa có tài khoản?
              <Link to="/sign-up" className="text-gray-900 ml-1 underline">Tạo ngay</Link>
            </h3>
        
        </div>
        <div className="w-2/5 h-full hidden lg:block">
          <img
            src={image}
            className="h-full w-full object-cover rounded-3xl"
          />
        </div>
      </section>
   </div>
  );
}

export default SignInClient;
