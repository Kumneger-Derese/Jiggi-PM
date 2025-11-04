import { stats } from '../constants/stats'

const Stats = () => {
  return (
    <div>
      <div id='stats' className='grid grid-cols-2 md:grid-cols-4 gap-2 '>
        {stats.map(stat => (
          <div
            key={stat.id}
            className='stat flex bg-linear-150 border  p-4 rounded-md  flex-col items-center border-neutral-800 to-sky-950 from-neutral-900 gap-y-2 hover:translate-y-5 transition duration-150'
          >
            <h1 className='text-neutral-300 text-3xl font-black'>
              {stat.number}
              <span className='text-neutral-400'>
                {stat.id === 4 ? '%' : '+'}
              </span>
            </h1>
            <h2 className='text-neutral-500 -mt-2 font-bold text-lg'>
              {stat.title}
            </h2>
            <h3 className='text-neutral-400 text-center'>{stat.description}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Stats
