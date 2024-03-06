import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../services/operations/authAPI";
import { Link, useLocation } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const UpdatePassword = () => {
  const location = useLocation();
  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const { password, confirmPassword } = formData;

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, token));
  };

  return (
    <div className="text-richblack-25">
      {loading ? (
        <div>Loading</div>
      ) : (
        <div>
          <h1>Choose new Password</h1>
          <p>Almost done. Enter your new password and you're all set.</p>

          <form onSubmit={handleOnSubmit}>
            <label>
              <p>
                New Password<sup>*</sup>
              </p>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Password"
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {!showPassword ? <IoMdEye /> : <IoMdEyeOff />}
              </span>
            </label>

            <label>
              <p>
                Confirm New Password<sup>*</sup>
              </p>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm Password"
              />
              <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {!showConfirmPassword ? <IoMdEye /> : <IoMdEyeOff />}
              </span>
            </label>

            <button type="submit">
              Reset Password
            </button>
          </form>

          <div>
            <Link to={'/login'}>
              <div>Back To Login</div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
