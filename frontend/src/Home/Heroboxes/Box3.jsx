import { LuComponent, LuEllipsisVertical } from 'react-icons/lu'
import { HiOutlineClock } from 'react-icons/hi2'

const Box3 = () => {
  return (
    <div className='flex flex-col gap-y-2 '>
      <div className='flex justify-between bg-neutral-700 p-3 rounded-md items-center'>
        <div className='flex flex-col'>
          <h1 className='font-semibold text-2xl'>8h 12m</h1>
          <p className='text-neutral-500'>Average time spent</p>
        </div>
        <div className='p-2 rounded-full text-neutral-900 bg-neutral-50'>
          <HiOutlineClock size={32} />
        </div>
      </div>

      <div className='flex flex-col gap-4 bg-neutral-700 p-4 rounded-md'>
        <div className='flex justify-between items-center'>
          <div className='p-2 bg-neutral-600 rounded-md'>
            <LuComponent size={24} />
          </div>
          <div className='p-2 bg-neutral-600 rounded-md'>
            <LuEllipsisVertical size={24} />
          </div>
        </div>

        <div className='flex flex-col gap-4'>
          <div>
            <h1 className='text-xl font-bold mb-1'>Technical Meeting</h1>
            <p className='text-neutral-400'>
              Kim Software Solution is dedicated to create and maintain robust
              and reliable softwares and design appealing interfaces.
            </p>
          </div>

          {/* Date */}
          <div className='flex gap-x-4'>
            <h3 className='rounded-md  py-1 px-2 border border-neutral-500'>
              {new Date().toDateString()}
            </h3>
            <h3 className='rounded-md py-1 px-2 border border-neutral-500'>
              {new Date().toLocaleTimeString()}
            </h3>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Box3
