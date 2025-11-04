const ContentHeader = ({ title, content, subtitle, size = '' }) => {
  return (
    <div className='flex flex-col mb-8 justify-center items-center gap-y-2'>
      <p className='rounded-full py-0.5 text-center w-fit px-4 border border-sky-600'>
        {title}
      </p>
      <div className='font-bold text-3xl mb-2 text-neutral-200 text-center'>
        {content}
      </div>
      <div
        className={`text-neutral-500 text-center text-sm font-medium ${size} `}
      >
        {subtitle}
      </div>
    </div>
  )
}
export default ContentHeader
