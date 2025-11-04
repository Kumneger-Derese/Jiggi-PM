import { PrimaryButton } from '../components/Buttons'
import HomeNavbar from '../components/HomeNavbar'
import Box1 from './Heroboxes/Box1'
import Box3 from './Heroboxes/Box3'
import Box2 from './Heroboxes/Box2'
import { useAuth } from '../store/useAuthStore'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

gsap.registerPlugin(useGSAP, SplitText)

const Hero = () => {
  const { user } = useAuth()
  const heroRef = useRef()

  useGSAP(
    () => {
      const tl = gsap.timeline()
      const split = new SplitText('#heading', { type: 'words' })
      gsap.from('#title', {
        x: -10,
        opacity: 0,
        ease: 'power1.inOut',
        duration: 0.5
      })

      tl.from(split.words, {
        y: 30,
        opacity: 0,
        ease: 'sine.in',
        duration: 0.4,
        stagger: 0.09
      })

      tl.from('#subheading', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2
      })
    },
    { scope: heroRef }
  )

  return (
    <div
      ref={heroRef}
      className='bg-linear-150 from-neutral-800 to-neutral-900 relative px-4 pb-8 sm:px-8'
    >
      <HomeNavbar />

      {/* Hero Copy */}
      <div
        id='container'
        className='mt-16 mb-8 flex flex-col justify-center items-center gap-y-2'
      >
        <p
          id='title'
          className='rounded-full py-0.5 text-center w-fit px-4 border border-neutral-600'
        >
          20k+ Proiects Managed Effortlessly
        </p>

        <h1
          id='heading'
          className='font-bold text-4xl sm:text-5xl mb-2 text-neutral-200 text-center leading-12'
        >
          Manage your Team, Tasks & <br className='hidden sm:block' />
          Projects in one place
        </h1>

        <h3
          id={'subheading'}
          className='text-neutral-500 text-center text-sm font-medium mx-4 mb-4 sm:mx-0'
        >
          Boost productivity, collaborate effortlessly, and stay on top of{' '}
          <br className='hidden sm:block' />
          deadlines with Jiggi
        </h3>

        <Link to={user ? '/projects' : '/login'}>
          <PrimaryButton title={'Try for free'} />
        </Link>
      </div>

      {/* Info Boxes */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {/* Box 1 */}
        <Box1 />

        {/* Box 2 */}
        <Box2 />

        {/* Box 3 */}
        <Box3 />
      </div>
    </div>
  )
}
export default Hero
