import {Link} from 'react-router-dom'
import {useAuth} from '../store/useAuthStore'
import {HiOutlineUserCircle,} from "react-icons/hi2";

const Navbar = () => {
    const {user} = useAuth()

    return (
        <div
            className={
                'flex justify-between p-3.5 rounded-xl font-semibold mt-2 bg-neutral-800 items-center'
            }
        >
            <Link to={'/profile'} className={'flex gap-x-1 items-center text-sky-300 font-semibold'}>
                <HiOutlineUserCircle size={22} strokeWidth={1.5}/>
               <span className={'hidden sm:block'}> {user && <h2>{user?.username.toLocaleLowerCase()}</h2>}</span>
            </Link>


            <div className={'flex gap-x-4 items-center sm:pr-2'}>
                {!user && (
                    <div className='flex gap-x-4 items-center py-2'>
                        <Link to={'/login'}>Login</Link>
                        <Link to={'/register'}>Register</Link>
                    </div>
                )}

                {user && (
                    <div className='flex gap-x-4 items-center'>
                        <Link to={'/projects'}>Projects</Link>
                        <Link to={'/dashboard'}>Dashboard</Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar
