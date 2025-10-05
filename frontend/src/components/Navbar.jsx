import { Link } from 'react-router-dom'
import { useAuth } from '../store/useAuthStore'
import toast from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'

const Navbar = () => {
  const { clearCredentials, user } = useAuth()
  const queryClient = useQueryClient()

  const handleLogout = () => {
    if (user) {
      queryClient.resetQueries()
      clearCredentials()
      toast.error('ohh! you logged out.')
    }
  }

  return (
    <div
      className={
        'flex justify-between p-2 rounded-xl font-semibold mt-2 bg-neutral-800 items-center'
      }
    >
      <Link to={'/'} className={'text-sky-500 text-xl ml-4 font-bold'}>
        Jiggi
      </Link>

      {user && <h2>Username: {user?.username}</h2>}

      <div className={'flex gap-x-4 items-center pr-2'}>
        {!user && (
          <div className='flex gap-x-4 items-center py-2'>
            <Link to={'/login'}>Login</Link>
            <Link to={'/register'}>Register</Link>
          </div>
        )}

        {user && (
          <div className='flex gap-x-4 items-center'>
            <Link to={'/profile'}>Profile</Link>
            <Link to={'/projects'}>Projects</Link>
            <button
              onClick={handleLogout}
              className='bg-red-400 py-2 px-4 rounded-xl hover:text-neutral-800 transition-colors duration-300'
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
