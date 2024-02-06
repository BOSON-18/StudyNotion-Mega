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
    <form
      onSubmit={handleSubmit(submitContactForm)}
      className="w-5/12 text-[14px]   gap-3 mx-auto py-5 text-center"
    >
      <div className="flex flex-col text-richblack-700">
        <span className="flex flex-row gap-x-5">
          {/* firstname */}
          <div className="flex flex-col text-start">
            <label
              htmlFor="firstname"
              className="text-richblack-50 font-inter px-1 text-[14px] my-2 "
            >
              First Name
            </label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Enter First Name"
              className="bg-richblack-800 border-b-[0.5px] border-richblack-5 shadow-richblack-5 p-3 rounded-md"
              {...register("firstname", { required: true })}
            />
            {errors.firstname && (
              <span className="text-[#F1F2FF]">Please enter your name</span>
            )}
          </div>

          {/* lastname */}

          <div className="flex flex-col text-start">
            <label
              htmlFor="lastname"
              className="text-richblack-50 px-1 text-[14px] my-2  "
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Enter Last Name"
              className="bg-richblack-800 border-b-[0.5px] border-richblack-5 shadow-richblack-5 p-3 rounded-md "
              {...register("lastname")}
            />
          </div>
        </span>

        {/* email */}

        <div className="flex flex-col text-start">
          <label
            htmlFor="email"
            className="text-richblack-50 px-1 text-[14px] my-2 "
          >
            Email Address
          </label>

          <input
            type="email"
            name="email"
            id="email"
            placeholder="123@gmail.com"
            className="bg-richblack-800 border-b-[0.5px] border-richblack-5 shadow-richblack-5 p-3 rounded-md"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-[#F1F2FF]">Please enter your email</span>
          )}
        </div>

        {/* Phone */}
        <div className="flex flex-col text-start ">
          <label
            htmlFor="phone "
            className="text-richblack-50 text-[14px] my-2 "
          >
            Phone Number
          </label>
          <div className="flex flex-row gap-5 ">
            {/* DropDown */}

            <div className="flex flex-row gap-5">
              {" "}
              <select
                name="dropdown"
                id="dropdown"
                className="w-[19%] bg-richblack-800 border-b-[0.5px] border-richblack-5 shadow-richblack-5 text-richblack-50 p-3 rounded-md"
                {...register("countryCode", { required: true })}
              >
                {CountryCode.map((item, index) => {
                  return (
                    <option
                      key={index}
                      value={item.code}
                      className="bg-richblack-800 border-b-[0.5px] border-richblack-5 shadow-richblack-5 text-richblack-50 p-3 rounded-md"
                    >
                      {item.code}-{item.country}
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
                className="text-richblack-800 gap-5 bg-richblack-800 border-b-[0.5px] border-richblack-5 shadow-richblack-5 p-3 w-full rounded-md"
                {...register("phoneNumber", {
                  required: { value: true, message: "Invalid Phone Number" },
                  minLength: { value: 8, message: "Invalid Phone Number" },
                  maxLength: { value: 10, message: "Invalid Phone Number" },
                })}
              />
              {errors.phoneNumber && (
                <span className=" className=text-[#F1F2FF]">
                  {errors.phoneNumber.message}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* message */}

        <div className="flex flex-col text-start">
          <label
            htmlFor="message "
            className="text-richblack-50 text-[14px] my-2 "
          >
            Message
          </label>
          <textarea
            name="message"
            id="message"
            placeholder="Enter your message"
            {...register("message", { required: true })}
            className="bg-richblack-800 border-b-[0.5px] border-richblack-5 shadow-richblack-5 p-3 rounded-md"
            cols="30"
            rows="5"
          />
          {errors.message && (
            <span className="text-[#F1F2FF]">Please enter your message</span>
          )}
        </div>
        <div className="">
          {" "}
          <button
            className="bg-yellow-100 p-2 w-full rounded-md my-3 text-richblack-700"
            type="submit"
            text={"Send Message"}
          >
            Send Message
          </button>
        </div>
        {/* button */}
      </div>
    </form>
  );
};

export default ContactUsForm;
