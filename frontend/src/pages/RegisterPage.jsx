import { useEffect, useState } from 'react'
import { useRegisterUser } from '../hooks/useUserApi'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../store/useAuthStore'

const RegisterPage = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const { user } = useAuth()
  const { mutate, isPending } = useRegisterUser()

  useEffect(() => {
    if (user) {
      navigate('/projects')
    }
  }, [user, navigate])

  const registerUser = async e => {
    e.preventDefault()

    mutate({ username, email, password })
    navigate('/projects')
    setUsername('')
    setEmail('')
    setPassword('')
  }

  return (
    <div className='p-8 min-h-screen flex items-center justify-center'>
      <form
        onSubmit={registerUser}
        className={
          'py-4 px-12 mb-4 rounded-md flex flex-col gap-y-2 w-full md:w-3/6 mx-auto bg-neutral-800 text-neutral-300'
        }
      >
        <h1 className='font-black text-2xl text-center text-sky-500 mb-8'>
          Register Here
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
            placeholder='johndoe'
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
            placeholder='johndoe@gmail.com'
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
            placeholder='*******'
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

        <div className='mt-2 text-neutral-400'>
          Already have acount{' '}
          <Link className='text-blue-400 underline' to={'/login'}>
            Login
          </Link>
        </div>
      </form>
    </div>
  )
}
export default RegisterPage
