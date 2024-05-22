import React, { Fragment} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {routes} from './routes'
import DefautComponent from './components/DefautComponent/DefautComponent.jsx';
import 'firebase/database';  // Nếu dùng Realtime Database
import 'firebase/storage'; 
import { getDatabase, ref,get, orderByChild, equalTo, set, push, serverTimestamp } from 'firebase/database';
import { getAuth, GoogleAuthProvider, TwitterAuthProvider } from 'firebase/auth';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import PageTitleManager from './routes/PageTitleManager.jsx';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFz-_2pLc7DwYrivmRPo3NSdAH6LhbCGg",
  authDomain: "quanlykho-bigc.firebaseapp.com",
  databaseURL: "https://quanlykho-bigc-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "quanlykho-bigc",
  storageBucket: "quanlykho-bigc.appspot.com",
  messagingSenderId: "628510293537",
  appId: "1:628510293537:web:c03cf2804c2910e8dcad60",
  measurementId: "G-TKSBVDBNKD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const storage = getStorage(app);

const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider();
const twitterProvider = new TwitterAuthProvider();

function App() {
  return (
    <Router>
    <Routes>
      {routes.map((routes) => {
        const Page = routes.element
        const Layout = routes.isShowHeader ? DefautComponent : Fragment

        return (
          <Route key={routes.path} path={routes.path} element={
          <Layout>
           <Page/>
          </Layout>
       }/>
        )
      })}
      
    </Routes>
   </Router>
  );
}
export { database, storage, ref, set,get, push, storageRef, orderByChild, equalTo, uploadBytes, getDownloadURL, serverTimestamp };
// Trong file App.js, sửa dòng export cho auth
export { auth, googleProvider, twitterProvider };

export default App;
