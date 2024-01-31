import React from 'react'
import HighLightText from '../Components/core/HomePage/HighLightText'
import BannerImage1 from '../assets/Images/aboutus1.webp'
import BannerImage2 from '../assets/Images/aboutus2.webp'
import BannerImage3 from '../assets/Images/aboutus3.webp'
import Quote from '../Components/core/HomePage/Quote'
import FoundingStory from '../assets/Images/FoundingStory.png'
import Stats from '../Components/core/HomePage/Stats'
import LearningGrid from '../Components/core/AboutUs/LearningGrid'
import ContactFormSection from '../Components/core/AboutUs/ContactFormSection'

const AboutUs = () => {
  return (
    <div className='w-11/12 mx-auto'>
        {/* Section 1 */}
        <section>
            <div className='text-center mt-12 text-richblack-25'>
                <header className='text-richblack-25 font-semibold font-inter text-[36px] '>Driving Innovation in Online Education for a <HighLightText text={'Brighter Future'}/>
                
                <p className='w-11/12 text-xl font-normal'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                </header>

                <div className='flex flex-row mx-auto  my-6 gap-x-4'>
                    <img src={BannerImage1} alt='' />
                    <img src={BannerImage2} alt='' />
                    <img src={BannerImage3} alt='' />
                </div>
            </div>
        </section>

        {/* Section 2 */}

        <section>
            <div className='text-3xl font-inter font-semibold text-richblack-5'>
    <Quote/>
            </div>
        </section>

        {/* Section 3 */}

        <section>
            <div className='flex flex-row'>
                <div className='text-richblack-5'>
                    <h1 className='text-[36px] font-inter font-semibold'>Our Founding Story </h1>
                    <p className='text-[16px] font-medium font-inter'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                    <p className='text-[16px] font-inter font-medium'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                </div>

                <img src={FoundingStory}/>
            </div>

            <div className='flex flex-row text-richblack-5'>
                <div>
                    <h1 className='text-[36px] font-inter font-semibold'>Our Vision</h1>
                    <p className='text-[16px] font-medium font-inter'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                </div>
                <div>
                    <h1 className='text-[36px] font-inter font-semibold'>Our Mission</h1>
                    <p className='text-[16px] font-medium font-inter'>our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                </div>
            </div>
        </section>

        {/* Section 4 */}

        <section>
            <div>
                <Stats/>
            </div>
        </section>

        {/* Section 5 */}
        <section className='flex flex-col justify-center mt-8  items-center mx-auto'>
            <LearningGrid/>
            <ContactFormSection/>
        </section>
    </div>
  )
}

export default AboutUs