import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const BlackBtn = ({ text, linkedTo }) => {
  return (
    <Link to={linkedTo}>
      <motion.div
        className="bg-richblack-800 text-center text-[13px] px-6 py-3 font-inter shadow-inner shadow-[#f1f2ff27] rounded-lg font-bold "
        
        whileInView={{ x: 0 }}
        whileHover={{
          scale: 1.1,
          transition: { type: "spring", stiffness: 1000 },
        }}
      >
        {text}
      </motion.div>
    </Link>
  );
};

export default BlackBtn;
