import React from "react";

const HighLightText = ({ text }) => {
  return (
    <span className="font-bold bg-gradient-to-t from-[#00d9ff] to-[#F1F2FF] bg-clip-text text-transparent">
      {" "}
      {text}
    </span>
  );
};

export default HighLightText;
