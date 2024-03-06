import React from 'react';
import HighLightText from '../Components/core/HomePage/HighLightText';
import BannerImage1 from '../assets/Images/aboutus1.webp';
import BannerImage2 from '../assets/Images/aboutus2.webp';
import BannerImage3 from '../assets/Images/aboutus3.webp';
import Quote from '../Components/core/HomePage/Quote';
import FoundingStory from '../assets/Images/FoundingStory.png';
import Stats from '../Components/core/HomePage/Stats';
import LearningGrid from '../Components/core/AboutUs/LearningGrid';
import ContactFormSection from '../Components/core/AboutUs/ContactFormSection';
import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className='w-full scroll-smooth '
      >
        {/* Section 1 */}
        <section className='text-center mx-auto w-10/12 mt-12 text-richblack-25'>
          <header className='text-richblack-25 font-semibold font-inter text-[36px]'>
            Driving Innovation in Online Education for a <br />
            <HighLightText text={'Brighter Future'} />
          </header>

          <p className='w-9/12 mx-auto text-[16px] font-medium font-inter'>
            Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
          </p>

          <div className='flex flex-row mx-auto my-6 gap-x-4'>
            <img src={BannerImage1} alt='' className='w-full' />
            <img src={BannerImage2} alt='' className='w-full' />
            <img src={BannerImage3} alt='' className='w-full' />
          </div>
        </section>

        {/* Section 2 */}
        <section className='w-10/12 mx-auto text-4xl text-center my-[80px] font-inter font-semibold text-richblack-5'>
          <Quote />
        </section>

        {/* Section 3 */}
        <section className='w-10/12 mx-auto flex flex-row justify-between items-center'>
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className='text-richblack-5 w-[40%] gap-y-10'
          >
            <h1 className='text-[44px] font-inter font-semibold mb-5'>
              <HighLightText text={'Our Founding Story'}></HighLightText>{' '}
            </h1>
            <p className='text-[16px] font-medium font-inter text-richblack-300'>
              Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
            </p>
            <p className='text-[16px] font-inter font-medium text-richblack-300 mt-5'>
              As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
            </p>
          </motion.div>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className='w-[40%] py-[90px]'
          >
            <img src={FoundingStory} alt='Founding Story' className='w-full' />
          </motion.div>
        </section>

        <section className='w-10/12 mx-auto flex flex-row justify-between items-center text-richblack-5'>
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className='w-[40%]'
          >
            <h1 className='text-[36px] font-inter font-semibold mb-5'>
              <HighLightText text={'Our Vision'}></HighLightText>
            </h1>
            <p className='text-[16px] font-thin text-richblack-300 font-inter'>
              With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
            </p>
          </motion.div>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className='w-[40%] my-5'
          >
            <h1 className='text-[36px] font-inter font-semibold mb-5'>
              <HighLightText text={'Our Mission'}></HighLightText>
            </h1>
            <p className='text-[16px] font-thin text-richblack-300 font-inter'>
              Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
            </p>
          </motion.div>
        </section>

        {/* Section 4 */}
        <section className='w-full bg-black'>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Stats />
          </motion.div>
        </section>

        {/* Section 5 */}
        <section className='flex flex-col justify-center mt-8 items-center mx-auto'>
          <LearningGrid />
          <ContactFormSection />
        </section>
      </motion.div>
    </>
  );
};

export default AboutUs;
