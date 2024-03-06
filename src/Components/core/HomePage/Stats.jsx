import React from 'react'

const Stats = () => {

    const StatsArr=[
        {count:"5K",label:"Active Students"},
        {count:"10+",label:"Mentors"},
        {count:"200+",label:"Courses"},
        {count:"50+",label:"Awards"}

    ]
  return (
    <div className='text-richblack-25  bg-[#161D29] mt-10'>

        
            <div className='flex flex-row gap-5 justify-evenly py-[40px] '>
                {StatsArr.map((data,index)=>{
                    return (
                        <div key={index} className='' > 
                            <h1 className='font-bold font-inter text-[30px]'>{data.count}</h1>
                            <h2 className='font-thin font-inter text-richblack-300'>{data.label}</h2>
                        </div>
                    )
                })}
            </div>
        

    </div>
  )
}

export default Stats