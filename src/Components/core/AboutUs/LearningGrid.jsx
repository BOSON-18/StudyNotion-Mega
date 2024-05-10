import React from "react";
import HighLightText from '../HomePage/HighLightText'
import YellowBtn from '../HomePage/YellowBtn'
import {motion} from 'framer-motion'
const LearningGrid = () => {
  const LearningGridArray = [
    {
      order: -1,
      heading: "World-Class Learning for",
      highlightText: "Anyone, Anywhere",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
      BtnText: "Learn More",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Curriculum Based on Industry Needs",
      description:
        "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      order: 2,
      heading: "Our Learning Methods",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 3,
      heading: "Certification",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 4,
      heading: `Rating "Auto-grading"`,
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
  ];

  return (
    <motion.div initial={{y:100,opacity:0}} whileInView={{y:0,opacity:1}} transition={{duration:0.6,delay:0.1}}  className="grid mx-auto grid-cols-1 lg:grid-cols-4 my-10 w-10/12 text-richblack-100 " >
      {LearningGridArray.map((card, index) => {
        return (
          <div
            className={`${index === 0 && "lg:col-span-2 lg:h-[280px] bg-transparent"} ${
              card.order%2===1 ? "bg-richblack-700 lg:h-[280px]":"bg-richblack-800 lg:h-[280px]"
            } ${card.order === 3 && "lg:col-start-2"}`}
            key={index}
          >

            {
              card.order<0 ?(
                <div className="w-11/12 flex flex-col p-8 gap-3">
                  <div className="text-4xl font-semibold">
                    {card.heading}
                    <HighLightText text={card.highlightText}/>

                    </div>
                    <p className="font-regular text-[14px]">
                      {card.description}
                    </p>

                    <div className="w-fit">
                      <YellowBtn linkedTo={card.BtnLink} text={card.BtnText}  />
                      </div>
                  </div>
              ):(<div className="p-10 flex flex-col gap-8 ">
                <h1 className="text-xl text-[#F1F2FF] font-bold">{card.heading}</h1>
                <p className="font-regular text-[14px] ">{card.description}</p>
              </div>)
            }
          </div>
        );
      })}
    </motion.div>
  );
};

export default LearningGrid;
