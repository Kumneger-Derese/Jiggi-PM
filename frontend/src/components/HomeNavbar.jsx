import {Link} from 'react-router-dom'
import {useAuth} from '../store/useAuthStore'

const Navbar = () => {
    const {user} = useAuth()

    return (
        <div
            className={
                'flex justify-between py-3 px-6 rounded-xl font-semibold mt-2 bg-neutral-800 items-center'
            }
        >
            <Link to={'/'} className={'text-sky-500 text-xl font-bold'}>
                Jiggi
            </Link>


            <div className={'flex gap-x-4 items-center pr-2'}>
                {!user && (
                    <div className='flex gap-x-4 items-center py-2'>
                        <Link to={'/login'}>Login</Link>
                        <Link to={'/register'}>Register</Link>
                    </div>
                )}

                {user && (
                    <div className='flex gap-x-4 items-center'>
                        <Link to={'/projects'}>Projects</Link>
                        <Link to={'/profile'}>Profile</Link>
                        <Link to={'/dashboard'}>Dashboard</Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar
