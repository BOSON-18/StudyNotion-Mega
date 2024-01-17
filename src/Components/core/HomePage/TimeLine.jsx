import React from "react";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import TimeLineImg from "../../../assets/Images/TimelineImage.png";
const TimeLine = () => {
  const timeline = [
    {
      Logo: Logo1,
      heading: "Leadership",
      description: "Fully commited to the success company",
    },
    {
      Logo: Logo2,
      heading: "Leadership",
      description: "Fully commited to the success company",
    },
    {
      Logo: Logo3,
      heading: "Leadership",
      description: "Fully commited to the success company",
    },
    {
      Logo: Logo4,
      heading: "Leadership",
      description: "Fully commited to the success company",
    },
  ];
  return (
    <div className="flex flex-row w-11/12 gap-15 items-center mx-auto max-w-maxContent">
      <div className="w-[45%] flex flex-col gap-5">
        {timeline.map((element, index) => {
          return (
            <div className="flex flex-row gap-6 mt-8" key={index}>
              <div className="w-[50px] h-[50px] bg-white flex items-center rounded-full ">
                <img src={element.Logo} className=" mx-auto " />
              </div>
              <div>
                <h2 className="font-semibold text-18px text-richblack-800">
                  {element.heading}
                </h2>
                <p className="text-[14px] font-inter">{element.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative shadow-xl  ">
        <img
          src={TimeLineImg}
          alt="timeLineImage"
          className="w-[714px] h-[545px]  object-fit "
          style={{ boxShadow: "16px 16px 1px rgba(255, 255, 255, 0.9)" }}
        />

        <div className="bg-caribbeangreen-700 w-[511px]  translate-x-[20%]  absolute z-10 flex flex-row items-center mt-[-62px] rounded-sm justify-between p-5">
          <div className="flex flex-row items-center  gap-5 border-r border-caribbeangreen-50 px-7">
            <p className="text-3xl text-white font-semibold">10</p>

            <p className="text-xl font-inter text-caribbeangreen-300">
              Years Experiences
            </p>
          </div>
          <div className="flex flex-row items-center px-7 gap-5 ">
            <p className="text-3xl text-white font-semibold">250</p>

            <p className="text-xl text-semi font-inter text-caribbeangreen-300">
              TYPES OF COURSES
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
