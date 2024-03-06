import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./Components/common/Header";
import AboutUs from "./pages/AboutUs";
import LoginForm from "./Components/core/auth/LoginForm";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import SignUp from "./pages/SignUp";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import MyProfile from "./Components/dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./Components/core/auth/PrivateRoute";
import EnrolledCourses from "./Components/dashboard/EnrolledCourses";
import Cart from "./Components/dashboard/Cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";
import AddCourse from "./Components/dashboard/AddCourse";
const App = () => {

  const{user}=useSelector((state)=>state.profile)
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter text-richblack-50">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<AboutUs />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/forgot-Password" element={<ForgotPassword />}></Route>
          <Route
            path="/update-Password/:id"
            element={<UpdatePassword />}
          ></Route>
          <Route path="/verify-email" element={<VerifyEmail />}></Route>

          <Route
            //path='/dashboard/my-profile'
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route path="/dashboard/my-profile" element={<MyProfile />}></Route>
            <Route path="/dashboard/settings" element={<MyProfile />}></Route>

            {user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="dashboard/cart" element={<Cart />}></Route>
                <Route
                  path="dashboard/enrolled-courses"
                  element={<EnrolledCourses />}
                ></Route>
              </>
            )}

{user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="dashboard/add-course" element={<AddCourse />}></Route>
               
              </>
            )}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
