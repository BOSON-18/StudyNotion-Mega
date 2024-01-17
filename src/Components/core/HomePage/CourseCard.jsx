import React from 'react'

const CourseCard = ({courses,activeCard,setActiveCard}) => {
   // console.log(cardData);

    const{description,heading,level,lessionNumber}=courses;
    //console.log("Prinitng Desription :"+description,"Prinitng Heading:"+heading,"Prinitng Level"+level,"Prinitng lessionNumber:"+lessionNumber);
    console.log(activeCard)
  return (
    <div className={` ${activeCard===courses.heading?"bg-white shadow-[12px_12px_0_0] shadow-yellow-50":"bg-richblack-700"} w-[341.22px] h-[244px] mx-auto`} onClick={()=>{setActiveCard(courses.heading); console.log(activeCard)}} >
<div className='flex flex-col px-[24px] pt-[32px] pb-[52px] gap-3'>
    <div className={`text-[20px] font-semibold font-inter ${activeCard===courses.heading?"text-black":"text-richblack-5"}`}>
        {heading}
    </div>

    <div className='text-[16px] font-inter text-richblack-400    '>
        {description}
    </div>

    <div className={`flex flex-row gap-x-4 px-6 py-4  font-inter font-medium text-[16px] ${activeCard===courses.heading?" text-blue-400":"text-richblack-400"} justify-between items-center  border-t-2 mt-2 border-spacing-x-2 border-t-richblack-500 `}>
        <div className='gap-x-2'>{level}</div>
        <div className='gap-x-2'>{lessionNumber} Lessons</div>
    </div>

</div>
    </div>
  )
}

export default CourseCard