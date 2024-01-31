import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { apiConnector } from "../../services/apiConnector";
import CountryCode from "../../data/countrycode.json";
const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessfull },
  } = useForm();

  const submitContactForm = async (data) => {
    console.log("Logging Data", data);

    try {
      setLoading(true);
      //   const response = await apiConnector(
      //     "POST",
      //     contactusEndpoint.CONTACT_US_API,
      //     data
      //   );
      const response = { status: "OK" };
      console.log("Logging response", response);
      setLoading(false);
    } catch (error) {
      console.log("Error:", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessfull) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNumber: "",
      });
    }
  }, [isSubmitSuccessfull, reset]);

  return (
    <form onSubmit={handleSubmit(submitContactForm)}>
      <div className="flex flex-col text-richblack-700">
        {/* firstname */}
        <div>
          <label htmlFor="firstname" className="text-richblack-50">
            First Name
          </label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="Enter First Name"
            {...register("firstname", { required: true })}
          />
          {errors.firstname && <span>Please enter your name</span>}
        </div>

        {/* lastname */}

        <div>
          <label htmlFor="lastname" className="text-richblack-50">
            Last Name Name
          </label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Enter Last Name"
            {...register("lastname")}
          />
        </div>

        {/* email */}

        <div>
          <label htmlFor="email" className="text-richblack-50">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            id="email"
            placeholder="123@gmail.com"
            {...register("email", { required: true })}
          />
          {errors.email && <span>Please enter your email</span>}
        </div>

        {/* Phone */}
        <div className="flex flex-col ">
          <label htmlFor="phone">Phone Number</label>
          <div className="flex flex-row w-fit gap-5 ">
            {/* DropDown */}

            <div className="flex flex-row gap-5">  <select
                name="dropdown"
                id="dropdown"
                className="w-[20%]"
                
                {...register("countryCode", { required: true })}
              >
                {CountryCode.map((item, index) => {
                  return (
                    <option key={index} value={item.code} >
                      {item.code}
                    </option>
                  );
                })}
              </select>
          
            {/* Input */}
           
              <input
                type="number"
                name="number"
                id="number"
                placeholder="1234567890"
                className="text-richblack-800 gap-5"
                {...register("phoneNumber", {
                  required: { value: true, message: "Invalid Phone Number" },
                  minLength: { value: 8, message: "Invalid Phone Number" },
                  maxLength: { value: 10, message: "Invalid Phone Number" },
                })}
              />
              {errors.phoneNumber && (
                <span className="text-richblack-25">
                  {errors.phoneNumber.message}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* message */}

        <div>
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            id="message"
            placeholder="Enter your message"
            {...register("message", { required: true })}
            cols="30"
            rows="7"
          />
          {errors.message && <span>Please enter your message</span>}
        </div>

        {/* button */}
        <button
          className="bg-yellow-100 p-2  text-richblack-700"
          type="submit"
          text={"Send Message"}
        ></button>
      </div>
    </form>
  );
};

export default ContactUsForm;
