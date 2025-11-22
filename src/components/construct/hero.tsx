import {Framer, Phone, Star} from 'lucide-react'

const Hero = () => {

    const Card = [
      {img: '/image/pics1.jpg', name: 'pics1'},
      {img: '/image/pics2.jpg', name: 'pics2'},
      {img: '/image/pics3.jpg', name: 'pics3'},
      {img: '/image/pics1.jpg', name: 'pics1'},

    ]

  return (
    <div className='py-8 sm:py-16 px-8 sm:px-16 '>
         <div className='flex flex-col justify-center w-full items-center'>
              <button className='border border-green-300 bg-[#EDFFF2] w-fit flex justify-center h-12 p-3  items-center gap-2 rounded-md '>
                <Framer className='size-5'/>
                 <p className='text-xl font-bold'>Refer Stock - Framer Expert</p>
              </button>

              <div className='flex flex-col mt-5 gap-3'>
                 <p className='text-5xl font-bold sm:max-w-3xl text-center leading-14 font-serif text-wrap'>When Creativity Meet Vision Greatness Is Inevictable.</p>
                 <p className='text-gray-400 text-center text-[1.5rem] font-semibold '>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
              </div>

               <div className='flex sm:flex-row flex-col gap-6 mt-8 w-full sm:w-fit'>
                  <button className='w-full sm:w-54 flex justify-center h-16 p-3 bg-[#0047A5] items-center gap-2 rounded-md shadow-md'>
                <Phone className='size-5 text-white'/>
                 <p className='text-xl font-bold text-white'>Contact Us</p>
              </button>

              <button className='ring-2 ring-gray-400 w-full sm:w-54 flex justify-center h-16 p-3 shadow-md items-center gap-2 rounded-md '>
                <Framer className='size-5 '/>
                 <p className='text-xl font-bold'>Start With Us</p>
              </button>
               </div>

         </div>
          <div className='mt-10 gap-4 grid sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] grid-cols-[repeat(auto-fill,minmax(280px,1fr))]'>
                 {Card.map((pics) => (
                          <img src={pics.img} alt={pics.name} className='rounded-xl object-cover w-full h-[300px]'/>
                 ))}
                  
               </div>
    </div>
  )
}

export default Hero