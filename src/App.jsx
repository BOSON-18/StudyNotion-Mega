import React from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
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
import Cart from "./Components/dashboard/Cart/index";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import AddCourse from "./Components/dashboard/AddCourse";
import ContactUsForm from "./Components/common/ContactUsForm";
import MyCourses from "./Components/dashboard/MyCourses/MyCourses";
import EditCourse from "./Components/dashboard/EditCourse";
import Catalog from "./pages/Catalog";
import Footer from "./Components/common/Footer";
import CourseDetails from "./pages/CourseDetails";
import { logout } from "./services/operations/authAPI";
import toast from "react-hot-toast";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./Components/core/viewCourse/VideoDetails";
import Instructor from "./Components/dashboard/instructorDashboard/instructor";
const App = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter text-richblack-50">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<AboutUs />}></Route>
          <Route path="/catalog/:catalogName" element={<Catalog />} />
          <Route path="courses/:courseId" element={<CourseDetails />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/forgot-Password" element={<ForgotPassword />}></Route>
          <Route path="/contact" element={<ContactUsForm />}></Route>
          <Route
            path="/update-Password/:id"
            element={<UpdatePassword />}
          ></Route>
          <Route path="/verify-email" element={<VerifyEmail />}></Route>

          <Route
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route path="dashboard/my-profile" element={<MyProfile />} />

            {/* /<Route path="dashboard/Settings" element={<Settings />} /> */}

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
                <Route
                  path="dashboard/add-course"
                  element={<AddCourse />}
                ></Route>
                <Route path="dashboard/instructor" element={<Instructor/>}/>

                <Route path="dashboard/my-courses" element={<MyCourses />} />
                <Route
                  path="dashboard/edit-course/:courseId"
                  element={<EditCourse />}
                ></Route>
              </>
            )}
          </Route>

          <Route
            element={
              <PrivateRoute>
                <ViewCourse />
              </PrivateRoute>
            }
          >
            {user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route
                  path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                  element={<VideoDetails />}
                />
              </>
            )}
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
