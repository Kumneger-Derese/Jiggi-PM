import gsap from 'gsap'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import ContentHeader from './ContentHeader'
import { pricingData } from '../constants/pricing'
import { HiOutlineCheckCircle } from 'react-icons/hi2'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const Pricing = () => {
  const pricingRef = useRef()

  useGSAP(
    () => {
      const tl = gsap.timeline()

      tl.from('#price', {
        scrollTrigger: {
          trigger: '#pricing',
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
    { scope: pricingRef }
  )

  return (
    <div
      id='pricing'
      ref={pricingRef}
      className=' scroll-m-8 flex flex-col gap-8'
    >
      <ContentHeader
        title={'Our pricing'}
        content={'Simple, Transparent Pricing'}
        subtitle={
          'Discover, manage and optimize all your Saas tools from one powerful platform.'
        }
      />

      <div
        id='pricing'
        className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'
      >
        {pricingData.map(pricing => (
          <div
            key={pricing.id}
            id='price'
            className='flex flex-col gap-y-2 p-4 rounded-xl bg-linear-150 from-neutral-800 to-[#0c373f]'
          >
            <div className='flex justify-between items-center'>
              <div className='flex flex-col gap-1 w-2/3'>
                <h2 className='text-xl font-semibold'>{pricing.title}</h2>
                <p className='text-neutral-400'>{pricing.description}</p>
              </div>
              <div className='w-1/3 flex justify-end'>
                <p className='p-2 rounded-md font-semibold bg-sky-600'>
                  {pricing.price}
                </p>
              </div>
            </div>

            <hr className='text-neutral-500 my-1' />

            <div className='flex flex-col gap-y-2 my-8'>
              {pricing.content.map(content => (
                <div key={content} className='flex gap-x-2 items-center'>
                  <div>
                    <HiOutlineCheckCircle color='skyblue' />
                  </div>
                  <p>{content}</p>
                </div>
              ))}
            </div>

            {/* Button */}
            <button
              className={`py-2 font-semibold transition duration-200 hover:bg-sky-600 rounded-full mt-4 border border-sky-600 ${
                pricing.id === 2 ? 'bg-sky-600 hover:bg-transparent' : ''
              } `}
            >
              {pricing.btnText}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Pricing
