import { FaQuoteRight } from 'react-icons/fa6'
import { testimonials } from '../constants/testimonials'
import ContentHeader from './ContentHeader'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const Testimonials = () => {
  const testimonialRef = useRef()

  useGSAP(
    () => {
      const tl = gsap.timeline()

      tl.from('#testimonial', {
        scrollTrigger: {
          trigger: '#testimonials',
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
    { scope: testimonialRef }
  )

  return (
    <div ref={testimonialRef} className='flex flex-col gap-y-8'>
      <ContentHeader
        title={'Testimonials'}
        content={'What our users say'}
        size='sm:w-1/2'
        subtitle={`
          See how Jiggi has transformed the way teams work. Hear directly from users who've improved their productivity and project management.`}
      />

      <div
        id='testimonials'
        className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'
      >
        {testimonials.map(testimonial => (
          <div
            key={testimonial.id}
            id={'testimonial'}
            className='flex flex-col bg-neutral-800 gap-4 rounded-md p-2 border border-neutral-700'
          >
            <div className='text-sky-400'>
              <FaQuoteRight size={32} />
            </div>

            <h1 className='text-neutral-400'>{testimonial.quote}</h1>

            <div className='flex justify-between gap-2'>
              <h2 className='font-medium'>{testimonial.author}</h2>
              <h3 className='text-sm text-neutral-500'>
                {testimonial.position}
              </h3>
            </div>

            <hr className='text-neutral-600' />
            <h2 className='font-black text-lg text-sky-400'>
              {testimonial.comapany}
            </h2>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Testimonials
