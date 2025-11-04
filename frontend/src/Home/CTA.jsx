import { HiArrowRight } from 'react-icons/hi2'
import { PrimaryButton } from '../components/Buttons'
import Ui1 from '../asset/Ui1.jpg'
import Ui2 from '../asset/Ui2.jpg'
import Ui3 from '../asset/Ui3.jpg'
import { Link } from 'react-router-dom'
import { useAuth } from '../store/useAuthStore'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const CTA = () => {
  const { user } = useAuth()
  const ctaRef = useRef()

  useGSAP(
    () => {
      const tl = gsap.timeline()

      tl.from(['#cta1', '#cta2', '#cta3', '#cta4'], {
        scrollTrigger: {
          trigger: '#cta1',
          start: 'top bottom',
          end: 'bottom center',
          scrub: true
        },
        x: -50,
        opacity: 0,
        duration: 4,
        stagger: 2
      })
    },
    { scope: ctaRef }
  )

  return (
    <div
      id='about'
      ref={ctaRef}
      className='container scroll-m-8 flex flex-col gap-y-4 items-center justify-center p-16 bg-linear-180 rounded-4xl from-sky-800 to-sky-950'
    >
      <div id='cta1' className='flex items-center'>
        <img
          className=' size-12 border -mr-2 rounded-full'
          src={Ui1}
          alt='ui-image'
        />
        <img
          className=' size-16 z-20 border -mr-2 rounded-full'
          src={Ui2}
          alt='ui-image'
        />
        <img
          className=' size-12 border -mr-2 z-10 rounded-full'
          src={Ui3}
          alt='ui-image'
        />
      </div>

      <p id='cta2' className='rounded-full py-0.5 text-center w-fit px-4'>
        20k+ Proiects Managed Effortlessly
      </p>

      <h1
        id='cta3'
        className='font-bold text-2xl text-center sm:text-4xl mt-4 mb-4'
      >
        Start your free trial today
      </h1>

      <div id='cta4' className='flex flex-col sm:flex-row gap-4'>
        <Link to={user ? '/projects' : '/login'}>
          <PrimaryButton title={'Try for Free'} />
        </Link>

        <button className='flex gap-x-2 items-center border rounded-full px-4 w-fit py-1 self-center font-semibold'>
          <span>Demo</span>
          <span className='bg-white hover:bg-neutral-900 hover:text-white text-neutral-900 rounded-full p-1'>
            <HiArrowRight size={18} />
          </span>
        </button>
      </div>
    </div>
  )
}
export default CTA
