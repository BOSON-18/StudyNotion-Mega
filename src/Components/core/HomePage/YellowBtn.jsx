import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const YellowBtn = ({ text, linkedTo }) => {
  return (
    <Link to={linkedTo}>
      <motion.div
        whileHover={{
          scale: 1.1,
          transition: { type: "spring", stiffness: 1000 },
        }}
        className="bg-yellow-50 text-black font-inter text-center text-[13px] gap-2 shadow-inner shadow-[#FFFFFF82] drop-shadow-sm px-6 py-3 rounded-lg font-bold"
      >
        {text}
      </motion.div>
    </Link>
  );
};

export default YellowBtn;
