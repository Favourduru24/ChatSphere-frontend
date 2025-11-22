import {Trophy} from "lucide-react"
const Testimonial = () => {
     
     const TestimonialCard = [
      {testimony: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic ipsa illum corrupti officiis explicabo pariatur dolorem iusto laudantium assumenda nisi aut, ad beatae, aliquid blanditiis vel iste. Dolorum, quisquam asperiores. ', clientImage: '', clientName: 'Alice Ken', clientStatus: 'Limburge Hotel'},
      {testimony: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic ipsa illum corrupti officiis explicabo pariatur dolorem iusto laudantium assumenda nisi aut, ad beatae, aliquid blanditiis vel iste. Dolorum, quisquam asperiores. ', clientImage: '', clientName: 'James Clerk', clientStatus: 'Valley EcoSystem'},
      {testimony: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic ipsa illum corrupti officiis explicabo pariatur dolorem iusto laudantium assumenda nisi aut, ad beatae, aliquid blanditiis vel iste. Dolorum, quisquam asperiores. ', clientImage: '', clientName: 'Samson Hills', clientStatus: 'Rasa Hotel'},
     ]

  return (
    <div className="py-8 sm:py-16 px-8 sm:px-16">
         <div className="flex flex-col justify-center w-full items-center">
             <button className='border border-green-300 bg-[#EDFFF2] w-fit flex justify-center h-12 py-1 px-4 items-center gap-2 rounded-full '>
                             <Trophy className='size-4 text-green-500'/>
                <p className='text-lg font-bold text-green-500'>Testimonials</p>
             </button>

               <div className='flex flex-col mt-5 gap-1'>
                 <p className='text-4xl font-semibold sm:max-w-3xl text-center leading-14 font-serif text-wrap'>What Client Say.</p>
                 <p className='text-gray-400 text-center text-[1.5rem] font-semibold '>Few words from client we have satisfied!.</p>
              </div>

               
         </div>

         <div className="mt-10 gap-4 grid sm:grid-cols-[repeat(auto-fill,minmax(400px,1fr))] grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
                {TestimonialCard.map((test) => (
                   <div className="flex flex-col shadow-md bg-white rounded-[20px] p-6">
                          <div className="flex gap-3">
                         <div className="w-14 h-14 rounded-full bg-red-400"></div>
                          <div className="flex flex-col">
                            <p className="font-semibold text-2xl font-sans ">{test.clientName}</p>
                            <p className="text-[1rem] font-semibold">{test.clientStatus}</p>
                          </div>
                        </div>

                         <div className="pt-8 px-5">
                              <p className="leading-8 text-lg font-medium text-gray-400 font-serif text-center">{test.testimony}</p>
                         </div>

                        <ul className="w-full justify-end flex mt-5 gap-3">
                             {Array(5).fill('null').map((_, index) => (
                                 <li key={index}>
                                     <img src="/image/star.svg" width={24} height={24} alt="star" className="size-[23px]"/>
                                 </li> 
                             ))}
                        </ul>
                   </div>
                ))}
               </div>
    </div>
  )
}

export default Testimonial