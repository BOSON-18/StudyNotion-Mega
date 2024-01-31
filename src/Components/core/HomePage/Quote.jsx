import React from 'react'
import HighLightText from './HighLightText'

const Quote = ({text}) => {
  return (
    <div>
                    We are passionate about revolutionizing the way we learn. Our innovative platform <HighLightText text={'combines technology'} />,<span className='text-blue-200'>expertise</span> , and community to create an <span>unparalleled educational experience.</span>

    </div>
  )
}

export default Quote