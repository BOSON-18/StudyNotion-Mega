import React from 'react'
import InstructorImg from "../../../assets/Images/Instructor.png"
import HighLightText from "./HighLightText";
import YellowBtn from './YellowBtn';

const InstructorSection = () => {
  return (
    <div>
<div className='flex flex-row gap-20 items-center justify-between'>
<div className='w-[50%]'>
    <img
    src={InstructorImg}
    alt='auntyImg'
    className='shadow-xl'
style={{ boxShadow: "-16px -16px 1px rgba(255, 255, 255, 0.9)" }}
    />
    </div> 

    <div className='w-[50%] flex flex-col gap-10'>
        
        <div className='text-4xl font-semibold w-[50%] gap-8'>
            Become an <HighLightText text={"Instructor"} />
            
            </div>

            <p className='font-medium  text-[16px] w-[80%] text-richblack-300'> 
            Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
            </p>

<span className='w-fit'>
            <YellowBtn text={'Start Teaching Today ->'} linkedTo={'/signup'} />
            </span>
            </div>   
</div>
    </div>
  )
}

export default InstructorSection