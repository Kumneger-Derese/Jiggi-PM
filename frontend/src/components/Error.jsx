import { useRouteError } from 'react-router-dom'

const Error = () => {
  const error = useRouteError()

  console.log(error)

  return (
    <div className='grid place-items-center place-content-center p-32 gap-y-4 bg-neutral-900 text-red-400 min-h-screen'>
      <h1 className='font-sans text-5xl font-bold flex gap-x-2 items-center'>
        <p>Oops error occurred.</p>
      </h1>

      <p className='font-bold text-xl '>
        {error.statusText && error?.statusText}
      </p>
      <p className='text-yellow-200'>{error.data && error?.data}</p>
    </div>
  )
}
export default Error
