import React from "react";
import HighLightText from '../../core/HomePage/HighLightText'
import YellowBtn from '../HomePage/YellowBtn'
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
    <div className="grid mx-auto grid-cols-1 lg:grid-cols-4 mb-10 w-11/12 text-richblack-100 " >
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
                    <p className="font-medium">
                      {card.description}
                    </p>

                    <div className="w-fit">
                      <YellowBtn linkedTo={card.BtnLink} text={card.BtnText}  />
                      </div>
                  </div>
              ):(<div className="p-10 flex flex-col gap-8 ">
                <h1 className="text-lg font-bold">{card.heading}</h1>
                <p>{card.description}</p>
              </div>)
            }
          </div>
        );
      })}
    </div>
  );
};

export default LearningGrid;
