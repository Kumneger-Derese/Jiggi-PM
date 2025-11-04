import gsap from 'gsap'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PrimaryButton } from '../components/Buttons'
import CollbImage from '../asset/jiggi.jpeg'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const Collaboration = () => {
  const collaborationRef = useRef()

  useGSAP(
    () => {
      const tl = gsap.timeline()

      tl.from('#collab1', {
        scrollTrigger: {
          trigger: '#container',
          start: 'top bottom',
          end: 'bottom center',
          scrub: true
        },
        x: -50,
        opacity: 0,
        duration: 1,
        stagger: 0.5
      })
    },
    { scope: collaborationRef }
  )

  return (
    <div
      ref={collaborationRef}
      className='flex flex-col md:flex-row gap-y-16 justify-between items-center'
    >
      {/* Right Section */}
      <div id='container' className='w-full sm:w-1/2 flex flex-col gap-y-2'>
        <p
          id='collab1'
          className='rounded-full py-0.5 w-fit px-4 border border-sky-600'
        >
          Best Feature
        </p>

        <h1
          id='collab1'
          className='font-bold text-3xl sm:text-5xl mb-2 text-neutral-200'
        >
          Collaboration that moves at your speed
        </h1>

        <h3 id='collab1' className='text-neutral-500 mb-8 text-sm font-medium'>
          With instant syncing across devices, Jiggi ensures that every task{' '}
          <br className='hidden sm:block' />
          update or shared information reflected in real time.
        </h3>
        <div id='collab1'>
          <PrimaryButton title={'Learn More'} />
        </div>
      </div>

      {/* Left Section */}
      <div className='w-full sm:w-1/2 flex justify-center items-center'>
        <img
          src={CollbImage}
          alt='CollbImage'
          className=' size-[95%] lg:size-[65%] rounded-3xl'
        />
      </div>
    </div>
  )
}
export default Collaboration
