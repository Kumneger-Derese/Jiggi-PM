const Column = ({ month, height = 'h-24', active }) => {
  return (
    <div className='flex flex-col items-center justify-end gap-y-2 relative'>
      <div
        className={`sm:w-6 w-13 lg:w-13 ${height} ${
          active ? 'bg-neutral-800' : ''
        } rounded-md bg-neutral-400`}
      />

      {active && (
        <div className='absolute top-2 -right-4 size-6 text-sm flex items-center justify-center bg-sky-400 rounded-full p-0.5'>
          +8
        </div>
      )}

      <p className={`${active ? 'text-neutral-900' : 'text-neutral-400'} `}>
        {month}
      </p>
    </div>
  )
}

export default Column
