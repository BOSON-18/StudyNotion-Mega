import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, signUp } from "../services/operations/authAPI";
import { setSignupData } from "../utils/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const { loading, signupData } = useSelector((store) => store.auth);
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;
    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  }
  return (
    <div className="text-richblack-5">
      {loading ? (
        <div>Loading/...</div>
      ) : (
        <div>
          <h1>Verify Email</h1>
          <p>A verification code has been sent to you.Enter the code below</p>

          <form onSubmit={handleSubmit}>
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
            />

            <button type="submit">Verify Email</button>
          </form>

          <div>
            <Link to={"/login"}>
              <p>Back to login</p>
            </Link>

            <button onClick={() => dispatch(sendOtp(signupData.email))}>
              Resend it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
