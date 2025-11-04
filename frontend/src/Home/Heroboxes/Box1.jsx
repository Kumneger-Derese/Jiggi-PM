import HeroImg3 from '../../asset/Ui3.jpg'
import { LuShapes } from 'react-icons/lu'
import { HiBellAlert } from 'react-icons/hi2'

const Box1 = () => {
  return (
    <div className='flex flex-col gap-4 '>
      <div className='p-3 rounded-md text-sky-400 self-end bg-neutral-700'>
        <HiBellAlert size={24} />
      </div>

      <div className='flex flex-col gap-6 p-4 rounded-md bg-neutral-700'>
        <div className='flex gap-x-4'>
          <div className='p-2 rounded-full bg-neutral-600'>
            <LuShapes size={40} />
          </div>

          <div className='flex flex-col'>
            <h1 className='font-semibold text-xl'>Branding Design</h1>
            <h2 className='text-neutral-400'>Eleven Juice</h2>
          </div>
        </div>

        <div className='flex flex-col gap-1'>
          <div className='flex justify-between in-checked:'>
            <p>Progress</p>
            <p>47%</p>
          </div>

          <div className='bg-neutral-500 rounded-md w-full h-3'>
            <div className='rounded-md w-[47%] h-3 bg-sky-400' />
          </div>
        </div>
      </div>

      <div className='flex justify-between gap-2 bg-neutral-700 p-3 rounded-md'>
        <img src={HeroImg3} alt='hero-img' className='size-12 rounded-md' />

        <div className='flex flex-col'>
          <h2 className='font-semibold text-neutral-200'>Markon Fekede</h2>
          <p className='text-neutral-400'>Yatch Tech</p>
        </div>

        <div className='flex flex-col items-center'>
          <h4 className='text-neutral-500'>Just Now</h4>
          <p className='bg-neutral-200 rounded-full text-neutral-900 size-6 p-1.5 flex items-center justify-center'>
            21
          </p>
        </div>
      </div>
    </div>
  )
}
export default Box1
