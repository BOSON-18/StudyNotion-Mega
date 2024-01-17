import React from "react";
import HighLightText from "./HighLightText";
import KnowYProgress from "../../../assets/Images/Know_your_progress.png"
import PlanYLessaon from "../../../assets/Images/Plan_your_lessons.png"
import CompareWOthers from "../../../assets/Images/Compare_with_others.png"
import YellowBtn from "./YellowBtn";
import {motion} from 'framer-motion'
const LearnLanguage = () => {
  return (
    <motion.div initial={{y:100}} whileInView={{y:0,transition:{duration:0.5}}}className=" mt-[150px]">
      <div className="flex flex-col gap-5">
        <div className="text-4xl font-semibold text-center font-inter">
          Your Swiss Knife for <HighLightText text={"learning any language"} />
        </div>

        <div className="text-center text-richblack-600 mx-auto font-medium w-[45%] text-base mt-3">
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </div>

        <div className="flex flex-row items-center justify-center mt-5">
          
<motion.img initial={{x:-200,opacity:0}} viewport={{ once: true }} whileInView={{x:120,opacity:1,transition:{duration:0.5,delay:0.6}}}
src={KnowYProgress}
alt="kyp"
className="object-contain translate-x-[120px]"
/>
<motion.img initial={{scale:0}} viewport={{ once: true }} whileInView={{scale:1,transition:{duration:0.5,delay:0.2}}}
src={CompareWOthers}
alt="CWO"
className="object-contain z-10"
/>
<motion.img initial={{x:200,opacity:0}} viewport={{ once: true }} whileInView={{x:-140,opacity:1,transition:{duration:0.5,delay:0.8}}}
src={PlanYLessaon}
alt="PYL"
className="object-contain translate-x-[-140px] z-20"
/>

        </div>

        <div className="text-center w-fit mx-auto mb-6">
          <YellowBtn text={"Learn more"} linkedTo={'/'} />
        </div>
        
      </div>
    </motion.div>
  );
};

export default LearnLanguage;
