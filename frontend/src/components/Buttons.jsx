import { HiArrowRight } from 'react-icons/hi2'
const PrimaryButton = ({ title }) => {
  return (
    <button className='px-3 flex w-fit gap-x-2 py-1.5 text-neutral-900 hover:text-white transition-colors duration-150 font-bold items-center rounded-full bg-white hover:bg-neutral-900'>
      <span>{title}</span>
      <span className='bg-neutral-900 hover:bg-white hover:text-neutral-900 text-white rounded-full p-1'>
        <HiArrowRight />
      </span>
    </button>
  )
}

export { PrimaryButton }
