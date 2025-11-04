import { HiChevronDown } from 'react-icons/hi2'
import { chartData } from '../../constants/chart'
import Column from '../../components/Coulmn'

const Box2 = () => {
  return (
    <div className=' h-fit flex flex-col gap-16 p-3 rounded-md bg-neutral-700'>
      <div className='flex flex-col gap-y-2'>
        <div className='flex justify-between items-center'>
          <h1 className='font-bold text-lg'>Task Completed</h1>
          <div className='flex gap-x-2 rounded-full p-1 px-2 items-center bg-neutral-600'>
            <h2>Yearly</h2>
            <HiChevronDown />
          </div>
        </div>
        <div className='flex gap-x-2'>
          <p className='bg-neutral-200 rounded-full text-neutral-900 size-6 p-2 flex items-center justify-center'>
            9
          </p>
          <p className='text-neutral-400'>Best result</p>
        </div>
      </div>

      {/* Chart */}
      <div>
        <div className='flex gap-x-4'>
          {chartData.map(chart => (
            <Column
              key={chart.id}
              month={chart.month}
              height={chart.height}
              active={chart.active}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
export default Box2
