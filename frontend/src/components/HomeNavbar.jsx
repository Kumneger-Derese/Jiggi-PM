import { Link } from 'react-router-dom'
import { LuMenu } from 'react-icons/lu'
import { useAuth } from '../store/useAuthStore'
import { useState } from 'react'
import { HiXMark } from 'react-icons/hi2'
import { menuData } from '../constants/menu'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useAuth()

  return (
    <div
      className={
        'flex sticky z-50 top-6 w-full justify-between py-3 px-6 rounded-xl font-semibold text-neutral-400 bg-neutral-800 items-center border border-neutral-700'
      }
    >
      {/* Start */}
      <Link to={'/'} className={'text-sky-500 text-xl font-bold'}>
        Jiggi
      </Link>

      {/* Middle */}
      <ul className='hidden md:flex items-center gap-x-4'>
        {menuData.map(menu => (
          <a
            key={menu.id}
            href={menu.href}
            className='hover:text-sky-400 transition-colors duration-150'
          >
            {menu.title}
          </a>
        ))}
      </ul>

      {/* End Conditional */}
      <div className={'hidden sm:flex gap-x-4 items-center pr-2'}>
        {!user && (
          <div className='flex gap-x-4 items-center'>
            <Link
              className='rounded-md px-4 py-1 hover:bg-white border-neutral-500 hover:border-transparent transition-colors duration-150 hover:text-neutral-900 border '
              to={'/login'}
            >
              Login
            </Link>
            <Link
              className='bg-white border border-transparent hover:border-neutral-500 hover:bg-neutral-800 hover:text-white transition-colors duration-150 text-neutral-900 rounded-md px-4 py-1'
              to={'/register'}
            >
              Register
            </Link>
          </div>
        )}

        {user && (
          <div className='flex gap-x-4 items-center'>
            <Link className='hover:text-sky-400' to={'/projects'}>
              Projects
            </Link>
            <Link className='hover:text-sky-400' to={'/dashboard'}>
              Dashboard
            </Link>
          </div>
        )}
      </div>

      {/* Menu button */}
      <div onClick={() => setIsOpen(true)} className='md:hidden'>
        <LuMenu size={26} />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed bg-neutral-600 text-neutral-100 top-0 right-0 w-1/2 md:hidden flex flex-col gap-y-8 p-4 h-full text-lg transition-transform duration-300
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div onClick={() => setIsOpen(false)} className='text-red-300 self-end'>
          <HiXMark size={24} strokeWidth={1.2} />
        </div>

        <ul className='flex flex-col gap-y-3'>
          {menuData.map(menu => (
            <li
              key={menu.id}
              className='bg-neutral-500 rounded-md px-2 p-1 hover:text-sky-400 transition-colors duration-150'
            >
              {menu.title}
            </li>
          ))}

          {/* End Conditional */}
          <div className={' sm:hidden gap-x-4 items-center pr-2 mt-8'}>
            {!user && (
              <div className='flex flex-col gap-4 items-center'>
                <Link
                  className='rounded-md px-4 py-1 hover:bg-white border-neutral-500 hover:border-transparent transition-colors duration-150 hover:text-neutral-900 border w-full '
                  to={'/login'}
                >
                  Login
                </Link>
                <Link
                  className='bg-white border border-transparent w-full hover:border-neutral-500 hover:bg-neutral-800 hover:text-white transition-colors duration-150 text-neutral-900 rounded-md px-4 py-1'
                  to={'/register'}
                >
                  Register
                </Link>
              </div>
            )}

            {user && (
              <div className='flex flex-col gap-4'>
                <Link
                  className='bg-neutral-500 rounded-md px-2 p-1 hover:text-sky-400'
                  to={'/projects'}
                >
                  Projects
                </Link>
                <Link
                  className='bg-neutral-500 rounded-md px-2 p-1 hover:text-sky-400'
                  to={'/dashboard'}
                >
                  Dashboard
                </Link>
              </div>
            )}
          </div>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
