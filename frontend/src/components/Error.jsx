import { useRouteError } from 'react-router-dom'

const Error = () => {
    const error = useRouteError()

    return (
        <div className='grid place-items-center place-content-center p-32 gap-y-4 bg-neutral-800 text-red-200 min-h-screen'>
            <h1 className='text-5xl font-bold'>Oops Error Occurred.</h1>
            <p className='font-semibold'>{error.message}</p>
            <p className='text-sm'>{error.stack}</p>
        </div>
    )
}
export default Error
