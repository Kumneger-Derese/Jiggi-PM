import {useRouteError} from 'react-router-dom'
import {BiError, BiErrorAlt} from "react-icons/bi";

const Error = () => {
    const error = useRouteError()

    return (
        <div
            className='grid place-items-center place-content-center p-32 gap-y-4 bg-neutral-900 text-red-400 min-h-screen'>
            <h1 className='font-sans text-5xl font-bold flex gap-x-2 items-center'>
                <BiError size={48} className={'text-yellow-200'}/>
                <p>Oops Error Occurred.</p>
            </h1>
            <p className='font-bold text-xl '>{error.statusText}</p>
            <p className='text-yellow-200'>{error.data}</p>
        </div>
    )
}
export default Error
