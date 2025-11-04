/* eslint-disable no-unused-vars */
import ContentHeader from './ContentHeader'
import { features } from '../constants/feature'
import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const Features = () => {
  const [mouseInter, setMouseInter] = useState(false)
  const [hoverId, setHoverId] = useState(null)
  const featureRef = useRef()

  useGSAP(
    () => {
      const tl = gsap.timeline()

      tl.from('#feature-grid', {
        scrollTrigger: {
          trigger: '#feature-tigger',
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
    { scope: featureRef }
  )

  const handleMouseEnter = id => {
    setHoverId(id)
    setMouseInter(true)
  }

  const handleMouseLeave = () => {
    setMouseInter(false)
    setHoverId(null)
  }

  return (
    <div
      ref={featureRef}
      id='feature'
      className='scroll-m-8 flex flex-col gap-8'
    >
      <ContentHeader
        title={'Our feature'}
        content={'Everything your team needs in one place'}
        subtitle={'All-in-one solution for task, project, and team management'}
      />

      <div
        id={'feature-tigger'}
        className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 '
      >
        {features.map(({ id, title, content, icon: Icon }) => (
          <section
            key={id}
            id='feature-grid'
            onMouseEnter={() => handleMouseEnter(id)}
            onMouseLeave={handleMouseLeave}
            className='relative overflow-clip'
          >
            {/* bg-blur */}
            {mouseInter && hoverId === id && (
              <div
                key={id}
                className='absolute blur-3xl top-6 -right-16 transition-colors duration-300 flex w-full flex-col gap-y-2 p-4 rounded-md bg-sky-500'
              />
            )}

            <div className='flex z-50 flex-col gap-y-2 p-4 rounded-md bg-neutral-800'>
              <div className='bg-neutral-700 shadow rounded-md p-2 mb-4 w-fit'>
                <Icon size={24} />
              </div>
              <h1 className='text-lg font-bold text-neutral-200'>{title}</h1>
              <h3 className='text-neutral-400'>{content}</h3>
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
export default Features
