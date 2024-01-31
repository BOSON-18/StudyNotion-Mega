import React, { useRef } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighLightText from "../Components/core/HomePage/HighLightText";
import YellowBtn from "../Components/core/HomePage/YellowBtn";
import BlackBtn from "../Components/core/HomePage/BlackBtn";
import banner from "../assets/Images/banner.mp4";
import { motion } from "framer-motion";
import CodeBlocks from "../Components/core/HomePage/CodeBlocks";
import "/src/App.css";
import TimeLine from "../Components/core/HomePage/TimeLine";
import LearnLanguage from "../Components/core/HomePage/LearnLanguage";
import InstructorSection from "../Components/core/HomePage/InstructorSection";
import ExploreMore from "../Components/core/HomePage/ExploreMore";

// const Home = () => {
//   const scrollRef = useRef(null);

//   return (
//     <div
//       initial={{ opacity: 0 }}
//       whileInView={{ opacity: 1, transition: { delay: 0.5, duration: 1 } }}
//       viewport={{ root: scrollRef }}
//     >
//       {/* Section1 */}
//       <div className="relative mx-auto w-11/12 text-white flex flex-col items-center justify-between max-w-maxContent">
//         <div className="group">
//           <Link to={"/signup"}>
//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               className="group flex bg-richblack-800 mx-auto p-4 rounded-full items-center mt-[20%] transition-all group-hover:bg-richblack-700 "
//             >
//               Become an Instructor <FaArrowRight className="ml-[5px]" />
//             </motion.button>
//           </Link>
//         </div>

//         <div className="text-center mt-10 font-semibold text-4xl font-inter gap-4">
//           Empower Your Future with
//           <HighLightText text={"  Coding Skills"} />
//         </div>

//         <motion.div
//           initial={{ x: -100, opacity: 0 }}
//           whileInView={{
//             x: 0,
//             opacity: 1,
//             transition: { duration: 0.6, type: "tween" },
//           }}
//           className="w-[913px] text-center text-[16px] font-medium font-inter gap-4 text-richblack-300 mt-4"
//         >
//           With our online coding courses, you can learn at your own pace, from
//           anywhere in the world, and get access to a wealth of resources,
//           including hands-on projects, quizzes, and personalized feedback from
//           instructors.
//         </motion.div>

//         <motion.div
//           className="flex flex-row gap-7 mt-8"
//           initial={{ y: -100 }}
//           whileInView={{ y: 0 }}
//         >
//           <YellowBtn text={"Learn More"} linkedTo={"/signup"} />
//           <BlackBtn text={"Book a Demo"} linkedTo={"/"} />
//         </motion.div>

//         <motion.span
//           initial={{ x: -100 }}
//           whileInView={{
//             x: 0,
//             delay: 0.5,
//             transition: { duration: 0.5, type: "spring", stiffness: 100 },
//           }}
//           viewport={{ root: scrollRef }}
//           className="shadow-blue-200 mx-3 inline-block my-14"
//         >
//           <video
//             muted
//             loop
//             autoPlay
//             className="h-[515px] shadow-xl"
//             style={{ boxShadow: "16px 16px 1px rgba(255, 255, 255, 0.9)" }}
//           >
//             <source src={banner} type="video/mp4 " />
//           </video>
//         </motion.span>

//         {/* Code Section 1 */}
//         <motion.div className="w-[90%]">
//           <CodeBlocks
//             position={"lg:flex-row"}
//             heading={
//               <div>
//                 Unlock Your
//                 <HighLightText text={"coding potential "} />
//                 with our online courses
//               </div>
//             }
//             subHeading={
//               "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
//             }
//             yellowText={"Try it yourself ->"}
//             blackText={"Learn More"}
//             codeBlock={`<!DOCTYPE html>
//               <html lang="en">
//               <head>
//                 <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//                 <title>Document</title>
//               </head>
//               <body>  
//               </body>
//               </html>
//             `}
//           />
//         </motion.div>

//         {/* Codeblock 2 */}
//         <motion.div className="w-[90%]">
//           <CodeBlocks
//             position={"lg:flex-row-reverse"}
//             heading={
//               <div>
//                 Start
//                 <HighLightText text={"coding in seconds"} />
//               </div>
//             }
//             subHeading={
//               "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
//             }
//             yellowText={"Continue Lesson ->"}
//             blackText={"Learn More"}
//             codeBlock={` <!DOCTYPE html>
//             <html lang="en">
//             <head>
//               <meta charset="UTF-8" />
//               <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//               <title>Document</title>
//             </head>
//             <body>
            
//             </body>
//             </html>
//           `}
//           />
//         </motion.div>
//       </div>

//       {/* Section2 */}
//       <div className="bg-pure-greys-5 text-richblack-300">
//         <div className="homepage_bg h-[333px]">
//           <div className="w-11/12 max-w-maxContent flex justify-center items-center gap-5 mx-auto">
//             <div className="flex flex-row gap-7 justify-center py-[120px]">
//               <YellowBtn text={"Explore Full Catalog ->"} linkedTo={"/signup"} />
//               <BlackBtn text={"Learn more"} linkedTo={"/"} />
//             </div>
//           </div>

//           <div className="w-11/12 flex flex-col mx-auto max-w-maxContent mt-[150px] gap-5">
//             <div className="flex justify-around">
//               <div className="text-4xl w-[45%] font-semibold font-inter">
//                 <h1>
//                   Get the skills you need for a
//                   <HighLightText text={"job that is in demand."} />
//                 </h1>
//               </div>
//               <div className="flex flex-col gap-10 w-[40%] items-start">
//                 <div className="text-[16px] font-medium text-richblack-700 font-inter">
//                   {" "}
//                   The modern StudyNotion is the dictates its own terms. Today,
//                   to be a competitive specialist requires more than professional
//                   skills.
//                 </div>
//                 <YellowBtn text={"Learn more"} />
//               </div>
//             </div>
//           </div>

//           <div className="flex flex-col mt-[52px]">
//             <TimeLine />
//             <LearnLanguage />
//         <InstructorSection />
//         {/* Review Slider */}
//           </div>
//         </div>

//         <h2 className="text-center text-4xl mt-10 font-semibold">Review from Other Learners</h2>
//       </div>
//       {/* Section3 */}

//       {/* Footer */}
//       {/* ... existing code ... */}
//     </div>
//   );
// };

// export default Home;




// ... Existing imports ...

const Home = () => {
 

  return (
    <motion.div >

      {/* Section1 */}
      <motion.div  initial={{opacity:0}} whileInView={{opacity:1,transition:{delay:0.2}}} className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between gap-8'>

        <Link to={"/signup"}>
          <motion.div   whileHover={{ scale: 1.1 }} >
          <motion.button
              whileHover={{ scale: 1.1 }}
              className="group flex bg-richblack-800 mx-auto p-4 rounded-full items-center mt-[20%] transition-all group-hover:bg-richblack-700 "
            >
              Become an Instructor <FaArrowRight className="ml-[5px]" />
            </motion.button>
          </motion.div>
        </Link>

        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{
            x: 0,
            opacity: 1,
            transition: {delay:0.2, duration: 0.6, type: "tween" },
          }}
          className="w-[913px] text-center text-[16px] font-medium font-inter gap-4 text-richblack-300 mt-4"
        >
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </motion.div>

        <motion.div
          className="flex flex-row gap-7 mt-8"
          initial={{ y: -100 }}
          whileInView={{ y: 0 ,transition:{delay:0.2}}}
        >
          <YellowBtn text={"Learn More"} linkedTo={"/signup"} />
          <BlackBtn text={"Book a Demo"} linkedTo={"/"} />
        </motion.div>

        <motion.div    initial={{ x: -100 }}
          whileInView={{
            x: 0,
            delay: 0.5,
            transition: { delay:0.2,duration: 0.5, type: "spring", stiffness: 100 },
          }}className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
          <video muted loop autoPlay className="shadow-[20px_20px_rgba(255,255,255)]">
            <source src={banner} type="video/mp4" />
          </video>
        </motion.div>

        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={<div className='text-4xl font-semibold'>Unlock Your <HighLightText text={"coding potential"} /> with our online courses</div>}
            subHeading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
            yellowText={"Continue Lesson ->"}
            blackText={"Learn More"}
            codeBlock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            codeColor={"text-yellow-25"}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
          />
        </div>

        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={<div className="w-[100%] text-4xl font-semibold lg:w-[50%]">Start <HighLightText text={"coding in seconds"} /></div>}
            subHeading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
            yellowText={"Continue Lesson ->"}
            blackText={"Learn More"}
            codeBlock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
            codeColor={"text-white"}
            backgroundGradient={<div className="codeblock2 absolute"></div>}
          />
        </div>

   <ExploreMore/>

      </motion.div>

      {/* Section 2 */}
      <div className='bg-pure-greys-5 text-richblack-700'>

        <div className="homepage_bg h-[320px]">
          <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8">
            <div className="lg:h-[150px]"></div>

            <div className="flex flex-row gap-7 text-white lg:mt-8">
              <YellowBtn text={'Explore Full Catalog ->'}  linkedTo={"/signup"}> </YellowBtn>
              <BlackBtn  text={'Learn more'} linkedTo={"/signup"}></BlackBtn>
            </div>

          </div>
        </div>

        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 ">

          <div className="mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
            <div className="text-4xl font-semibold lg:w-[45%] ">
              Get the Skills you need for a <HighLightText text={"Job that is in demand"} />
            </div>

            <div className="flex flex-col items-start gap-10 lg:w-[40%]">
              <p className='text-[16px]'> The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills. </p>
              <YellowBtn text={'Learn more'} linkedTo={"/signup"}></YellowBtn>
            </div>
          </div>

          <TimeLine/>
          <LearnLanguage />
        </div>
      </div>

      {/* Section 3 */}
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">

        <InstructorSection />
        <h1 className="text-center text-4xl font-semibold mt-8">review from Other Learners</h1>
        {/* Review Slider here */}
        {/* <ReviewSlider /> */}

      </div>

      {/* Footer */}
      {/* <Footer /> */}

    </motion.div>
  )
}

export default Home;
