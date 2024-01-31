import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Header from './Components/common/Header'
import AboutUs from './pages/AboutUs'
const App = () => {
  
  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inter'>
<BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/about' element={<AboutUs/>}></Route>
      </Routes>

      </BrowserRouter>
   
    </div>
  )
}

export default App