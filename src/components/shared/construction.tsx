import Header from '../construct/header'
import Hero from '../construct/hero'
import Testimonial from '../construct/testimonial'
import Booking from "../construct/booking"
import About from "../construct/about"

const Contruction = () => {
  return (
    <main className="">
       {/* <div className='h-scree'> */}
    <Header/>
    <Hero/>
    <About/>
       {/* </div> */}
    <Testimonial/>
    <Booking/>
   </main>
  )
}

export default Contruction