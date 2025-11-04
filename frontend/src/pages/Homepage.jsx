import Hero from '../Home/Hero.jsx'
import Stats from '../Home/Stats.jsx'
import Pricing from '../Home/Pricing.jsx'
import Benefits from '../Home/Benefits.jsx'
import Features from '../Home/Features.jsx'
import Collaboration from '../Home/Collaboration.jsx'
import Testimonials from '../Home/Testimonials.jsx'
import CTA from '../Home/CTA.jsx'
import Footer from '../Home/Footer.jsx'

const Homepage = () => {
  return (
    <div className={`flex flex-col gap-y-24 font-poppins`}>
      <Hero />

      <div className='px-8 flex flex-col gap-y-32'>
        <Benefits />
        <Features />
        <Collaboration />
        <Stats />
        <Testimonials />
        <Pricing />
        <CTA />
        <Footer />
      </div>
    </div>
  )
}
export default Homepage
