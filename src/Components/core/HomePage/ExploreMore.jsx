import React, { useEffect, useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import HighLightText from "./HighLightText";
import { motion } from "framer-motion";
import CourseCard from "./CourseCard";
const ExploreMore = () => {
  const tabs = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
  ];
  const [currentTab, setCurrentTab] = useState(HomePageExplore[0].tag);//upr options me 
  const [courses, setCourses] = useState(HomePageExplore[0].courses);//setting courses according to active tab
  const [activeCard, setActiveCard] = useState(HomePageExplore[0].courses[0]);//cards rendering me konsa active (white hona chaiye)
  // console.log(currentTab);
  // console.log(courses);
  console.log(activeCard);

  useEffect(() => {
    // Set initial active tab and courses based on the initial state
    setMyCards(currentTab);
  }, []);

  const setMyCards = (tab) => {
    setCurrentTab(tab);
    const result = HomePageExplore.filter((course) => course.tag === tab);
    console.log(result);
    setCourses(result[0].courses);
    setActiveCard(result[0].courses[0].heading);
  };

  return (
    <motion.div initial={{y:100}} whileInView={{y:0,transition:{duration:0.5}}}>
      <motion.div className="text-4xl text-center font-semibold font-inter">
        Unlock the <HighLightText text={"Power of Code"} />
      </motion.div>

      <p className="text-center text-[16px] text-richblack-300 font-medium text-sm m-3">
        Learn to build anything you can imagine
      </p>

      <div className="flex flex-row rounded-full bg-richblack-800 mt-8 mb-[150px] border-richblack-100 p-2 py-3">
        {tabs.map((tab, index) => {
          return (
            <motion.div
              whileTap={{
                scale: 1.3,
                transition: { type: "spring", stiffness: 100 },
              }}
              whileHover={{
                scale: 1,
                transition: { type: "tween" },
              }}
              className={`text-[16px] px-7 font-inter flex  items-center gap-3 ${
               tab===currentTab?"bg-white text-richblack-800":"bg-richblack-800 text-richblack-200"}
                
                ${activeCard== HomePageExplore[0].tag
                  ? "bg-richblack-5 text-richblack-800 font-medium rounded-full cursor-pointer "
                  : "bg-richblack-800 text-richblack-200 font-medium rounded-full"} transition-all duration-200 cursor-pointer hover:bg-richblack-700 hover:text-richblack-5 px-7 py-2"
              `}
              key={index}
               onClick={() => setMyCards(tab)}//tab of current Tab
            >
              {tab}
            </motion.div>
          );
        })}
      </div>

      <div className="absolute mx-auto flex flex-row gap-10 justify-between translate-y-[-40%] items-center translate-x-[-180px] ">
        {courses.map((course, index) => {
          return(
          <CourseCard
            key={index}
            courses={course}
            activeCard={activeCard}
            setActiveCard={setActiveCard}
          />
          )
})}
      </div>
    </motion.div>
  );
};

export default ExploreMore;
