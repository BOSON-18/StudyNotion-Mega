import React from 'react'
import ContactUsForm from '../../common/ContactUsForm'
import {motion} from "framer-motion"

const ContactFormSection = () => {
  return (
    <motion.div initial={{y:100,opacity:0}} whileInView={{y:0,opacity:1}} transition={{duration:0.6,delay:0.1}} className='w-9/12 mx-auto text-center'>

<h1 className='font-semibold text-[44px] text-[#F1F2FF]'>Get in Touch</h1>
<p className='font-thin text-[14px] text-[#F1F2FF]'>We’d love to here for you, Please fill out this form.</p>

<div className='my-8'>
    <ContactUsForm/>
</div>


    </motion.div>
  )
}

export default ContactFormSection