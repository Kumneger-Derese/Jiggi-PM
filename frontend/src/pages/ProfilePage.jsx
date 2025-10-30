import { useEffect, useState } from 'react'
import { useGetUserProfile, useUpdateUserProfile } from '../hooks/useUserApi.js'
import { useAuth } from '../store/useAuthStore.js'
import { useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import Loading from '../components/Loading.jsx'
import ComponentError from '../components/ComponentError.jsx'
import { Link } from 'react-router-dom'
import { HiChevronLeft } from 'react-icons/hi2'

const ProfilePage = () => {
  const { data, isLoading, isError, error } = useGetUserProfile()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { clearCredentials, user } = useAuth()
  const queryClient = useQueryClient()

  const { mutate, isPending } = useUpdateUserProfile()

  useEffect(() => {
    setUsername(data?.username)
    setEmail(data?.email)
  }, [data])

  const handleLogout = () => {
    if (user) {
      queryClient.resetQueries()
      queryClient.removeQueries()
      queryClient.clear()
      clearCredentials()
      toast.error('ohh! you logged out.')
    }
  }

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return (
      <ComponentError message={error.message || ' Something went wrong.'} />
    )
  }

  const handleUpdateUser = e => {
    e.preventDefault()

    mutate({ username, email, password })
  }

  return (
    <div className='p-8 flex flex-col md:flex-row gap-8 items-center h-screen justify-center'>
      {/* back button */}
      <Link to={'/projects'}>
        <HiChevronLeft
          strokeWidth={1.2}
          size={24}
          className='text-neutral-500 absolute top-12 left-16 hover:text-sky-500'
        />
      </Link>

      <div className=''>
        <h3>Name : {data.username}</h3>
        <h3>Email : {data.email}</h3>
        <button
          onClick={handleLogout}
          className='bg-red-400 py-2 px-4 rounded-xl hover:text-neutral-800 transition-colors duration-300'
        >
          Logout
        </button>
      </div>
      <form
        onSubmit={handleUpdateUser}
        className={
          'py-4 px-12 mb-4 rounded-md flex flex-col gap-y-2 w-full md:w-3/6 mx-auto bg-neutral-800 text-neutral-300'
        }
      >
        <h1 className='font-black text-2xl text-center text-sky-500 mb-8'>
          Update Profile
        </h1>

        <div className={'flex flex-col gap-1'}>
          <label
            htmlFor='username'
            className={'font-semibold text-neutral-400'}
          >
            {' '}
            Username
          </label>
          <input
            type='text'
            name=''
            id='username'
            value={username}
            autoComplete={'on'}
            onChange={e => setUsername(e.target.value)}
            className={'w-full border border-neutral-500 rounded-md p-2'}
          />
        </div>

        <div className={'flex flex-col gap-1'}>
          <label htmlFor='email' className={'font-semibold text-neutral-400'}>
            {' '}
            Email
          </label>
          <input
            value={email}
            autoComplete={'on'}
            type='email'
            name=''
            id='email'
            onChange={e => setEmail(e.target.value)}
            className={'w-full border border-neutral-500 rounded-md p-2'}
          />
        </div>

        <div className={'flex flex-col gap-1'}>
          <label
            htmlFor='password'
            className={'font-semibold text-neutral-400'}
          >
            {' '}
            Password
          </label>
          <input
            value={password}
            type='password'
            name=''
            id='password'
            autoComplete={'on'}
            onChange={e => setPassword(e.target.value)}
            className={'w-full border border-neutral-500 rounded-md p-2'}
          />
        </div>

        <button
          className={
            'px-4 py-2 rounded-md text-black bg-sky-500 font-semibold disabled:bg-neutral-600 disabled:text-neutral-200'
          }
          disabled={isPending}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default ProfilePage
