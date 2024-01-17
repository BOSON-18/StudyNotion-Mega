import React from "react";
import YellowBtn from "./YellowBtn";
import BlackBtn from "./BlackBtn";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = ({
  position,
  heading,
  subHeading,
  yellowText,
  blackText,
  bgGradient,
  codeColor,
  codeBlock,
}) => {
  return (
    <motion.div
      className={`flex ${position} flex-row  px-[90px] gap-[98px] justify-between my-10 mx-auto`}
    >
      {/* Section 1 */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1, transition: { duration: 0.6 } }}
        className="flex flex-col w-[50%] gap-8 "
      >
        <div className="text-3xl font-[36px] font-inter">{heading}</div>
        <div className="text-richblack-300  font-[16px] font-inter">
          {subHeading}
        </div>

        <div className="flex gap-7 mt-8 ">
          <YellowBtn text={yellowText} linkedTo={"/signup"} />
          <BlackBtn text={blackText} linkedTo={"/login"} />
        </div>
      </motion.div>

      {/* Section 2 */}
      <motion.div
        initial={{ x: 100 }}
        whileInView={{ x: 0, transition: { duration: 0.8 } }}
        className="h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[70%] lg:w-[450px]"
      >
        {/* Bg Gradient HW */}
        <motion.div className="text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold">
          <p className="no">1</p>
          <p className="no">2</p>
          <p className="no">3</p>
          <p className="no">4</p>
          <p className="no">5</p>
          <p className="no">6</p>
          <p className="no">7</p>
          <p className="no">8</p>
          <p className="no">9</p>
          <p className="no">10</p>
          <p className="no">11</p>
          <p className="no">12</p>
        </motion.div>
        <motion.div
          initial={{ x: 100 }}
          whileInView={{ x: 0 }}
          className={`w-[100%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1`}
        >
          <TypeAnimation
            sequence={[codeBlock, 50, ""]}
            repeat={Infinity}
            cursor={true}
            omitDeletionAnimation={true}
            style={{ whiteSpace: "pre-line", display: "block" }}
            speed={60}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CodeBlocks;
