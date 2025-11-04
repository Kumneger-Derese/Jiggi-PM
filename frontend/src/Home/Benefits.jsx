/* eslint-disable no-unused-vars */
import { useRef } from 'react'
import { benefits } from '../constants/benefits.js'
import ContentHeader from './ContentHeader.jsx'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const Benefits = () => {
  const benefitRef = useRef()

  useGSAP(
    () => {
      const tl = gsap.timeline()

      tl.from('#benefit', {
        scrollTrigger: {
          trigger: '#benefits',
          start: 'top bottom',
          end: 'bottom center',
          scrub: true
        },
        y: 20,
        opacity: 0,
        duration: 1,
        stagger: 0.4
      })
    },
    { scope: benefitRef }
  )
  return (
    <div ref={benefitRef} className='flex flex-col gap-4'>
      <ContentHeader
        title={'Benefits'}
        content={'The smart choice for your team'}
        subtitle={'Every thing you need to simplify'}
      />

      <div
        id='benefits'
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 place-content-center'
      >
        {/* lists */}
        {benefits.map(({ id, title, content, icon: Icon }) => (
          <div
            key={id}
            id='benefit'
            className='w-full sm:w-80  rounded-sm border border-neutral-600 bg-neutral-700 text-neutral-200 p-4 flex flex-col gap-y-2'
          >
            <div className='mb-4 bg-neutral-600 rounded-md p-2 w-fit'>
              <Icon size={24} />
            </div>
            <h1 className='font-bold text-lg'>{title}</h1>
            <h3 className='text-neutral-400/70'>{content}</h3>

            <p className='text-neutral-400 hover:text-blue-500 text-lg mt-2'>
              Learn more..
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Benefits
