import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/authAPI";

const ForgotPassword = () => {
  const { loading,token } = useSelector((state) => state.auth);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const dispatch=useDispatch()
  console.log(token)

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting')
    //setEmailSent(!emailSent)
    dispatch(getPasswordResetToken(email,token,setEmailSent))
    setEmailSent(!emailSent)
  };
  return (
    <div className="text-richblack-25 flex justify-center items-center">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1>{!emailSent ? "Reset Your Password" : "Check Your Mail"}</h1>

          <p>
            {!emailSent
              ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
              : `We have sent the reset email to ${email}`}
          </p>

          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <label>
                <p>Email Address:</p>
                <input
                  type="email"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yourEmailaddress@gmail.com"
                />
              </label>
            )}

            <button type="submit">
              {!emailSent ? "Reset Password" : "Resend Email"}
            </button>
          </form>

          <div>
            <Link to="/login">
              <p>Back to login</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
