import React, { useState, useRef } from 'react'

const About = () => {

  const [hasCopied, setHasCopied] = useState(false)

  const handleCopy = () => {
   navigator.clipboard.writeText('durupristine@gmail.com')

    setHasCopied(true)

    setTimeout( () => {
   setHasCopied(false)
    },2000)
  }


  

  return (
    <section className='py-8 sm:py-16 px-8 sm:px-16' id='about'>
        <div className='flex flex-col w-full justify-center gap-4'>
             <div className='flex gap-4'>
              <div className='max-w-[370px] h-[300px] rounded-xl shadow-sm bg-white p-6 w-full'></div>
              <div className='max-w-[400px] h-[300px] rounded-xl shadow-sm bg-white p-6 w-full'></div>
              <div className='max-w-[400px] h-[300px] rounded-xl shadow-sm bg-white p-6 w-full'></div>
             </div>
             <div className='flex gap-4'>
               <div className='max-w-[750px] h-[300px] rounded-xl shadow-sm bg-white p-6 w-full '></div>
              <div className='max-w-[370px] h-[300px] rounded-xl shadow-sm bg-white p-6 w-full'></div>
             </div>
        </div>
    </section>
  )
}

export default About