import Combobox from "./comboBox"
import {Phone} from "lucide-react"

 const Booking = () => {
      
    const country = [
        {value: 'Nigeria', label: 'Nigeria'},
        {value: 'Ghana', label: 'Ghana'},
        {value: 'Indian', label: 'Indian'},
    ]
    return (
        <div className="py-8 sm:py-16 px-8 sm:px-16 flex flex-col">
               <div className="flex flex-col justify-center w-full items-center">
                           <button className='border border-green-300 bg-[#EDFFF2] w-fit flex justify-center h-10 py-1 px-4 items-center gap-2 rounded-full '>
                                           <Phone className='size-4 text-green-500'/>
                              <p className='text-[1rem] font-bold text-green-500'>Contact Us</p>
                           </button>
              
                             <div className='flex flex-col mt-4 mb-8 justify-center items-center'>
                               <p className='text-4xl font-semibold sm:max-w-3xl text-center leading-14 font-serif text-wrap mb-2'>We Take Privacy Very Serious.</p>
                               <p className='text-gray-400 text-center text-[1rem] font-normal max-w-2xl mb-2'>We will never distribute your information. You can rest assured that your personal information, including your email address, will be kept in strict confidence</p>
                            </div>
                       </div>

           <div className="flex ">
              <form action="" className="flex flex-col gap-6 py-6 bg-white border border-[#f9fbfc] rounded-xl shadow-md max-w-xl w-full p-2">
                 <div className="w-full flex flex-col  relative">
                  <label htmlFor="country" className="text-sm font-normal text-gray-100 text-gray-300">
                  Name
                </label>
                <input
             id="Your Name"
             name="Your Name"
             placeholder="Your Name"
             className="w-full h-[50px] px-3 mt-2 py-2 border border-[#f9fbfc]  rounded-lg shadow-sm focus:outline-none  text-gray-500 placeholder:text-gray-300" 
            //  onChange={(e) => handleChange('numberOfDays', Number(e.target.value))}
          />

                 </div>
                 <div className="w-full flex flex-col  relative">
                  <label htmlFor="country" className="text-sm font-normal text-gray-100 text-gray-300">
                 Phone Number
                </label>
                <input
             id="phone"
             name="phone"
             placeholder="Phone Number"
             className="w-full h-[50px] px-3 mt-2 py-2 border border-[#f9fbfc]  rounded-lg shadow-sm focus:outline-none  text-gray-500 placeholder:text-gray-300" onChange={(e) => handleChange('numberOfDays', Number(e.target.value))}
          />

                 </div>
                 <div className="w-full flex flex-col  relative">
                  <label htmlFor="country" className="text-sm font-normal text-gray-100 text-gray-300">
                 Email
                </label>
                <input
             id="email"
             name="email"
             placeholder="email@gmail.com"
             className="w-full h-[50px] px-3 mt-2 py-2 border border-[#f9fbfc]  rounded-lg shadow-sm focus:outline-none  text-gray-500 placeholder:text-gray-300" onChange={(e) => handleChange('numberOfDays', Number(e.target.value))}
          />
                 </div>

                  <div>
            <label htmlFor="What you Building" className="text-sm font-normal text-gray-100 text-gray-300">
              What you Building
            </label>
          <input
             id="What you Building"
             name="What you Building"
             placeholder="What are U Building"
             className="w-full h-[50px] px-3 mt-2 py-2 border border-[#f9fbfc]  rounded-lg shadow-sm focus:outline-none  text-gray-500 placeholder:text-gray-300" onChange={(e) => handleChange('numberOfDays', Number(e.target.value))}
          />
          </div>

           <div className="w-full flex flex-col  relative">
          <label htmlFor="country" className="text-sm font-normal text-gray-100 text-gray-300 mb-2">
             Country
          </label>
           <Combobox
              options={country}
              placeholder="Select a Country"
            //   onSelect={(e: {value: string | undefined}) => {
            //              if(e.value) {
            //               handleChange('country', e.value)
            //              }
            //         }}
            />
          </div>

            <div className="w-full flex flex-col  relative">
                  <label htmlFor="country" className="text-sm font-normal text-gray-100 text-gray-300">
                  Send Us a Message
                </label>
                <textarea
             id="message"
             name="message"
             placeholder="Any other we need to Know..."
             className="w-full h-[200px] px-3 mt-2 py-2 border border-[#f9fbfc]  rounded-lg shadow-sm focus:outline-none  text-gray-500 placeholder:text-gray-300" onChange={(e) => handleChange('numberOfDays', Number(e.target.value))}
          />
                 </div>

                  <footer className=" w-full">
               <button className="!px-4 !rounded-lg !flex !items-center !justify-center !gap-1.5 !shadow-none !h-12 w-full cursor-pointer bg-[#0047A5]" >
                  {/* <Image src={`/assets/icons/${loading ? 'loader.svg' : 'magic-star.svg'}`} width={24} height={24} className={`size-5 ${loading ? 'animate-spin' : ''}`} alt="magic" /> */}

                  <span className="text-sm md:text-base font-semibold text-white">Submit Message</span>

               </button>
             </footer>
              </form>
           </div>
        </div>
    )
 }

 export default Booking