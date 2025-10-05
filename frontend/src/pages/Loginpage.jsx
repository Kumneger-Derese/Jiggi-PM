import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginUser } from '../hooks/useUserApi'
import { useAuth } from '../store/useAuthStore'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const { user } = useAuth()
  const { mutate, isPending } = useLoginUser()

  useEffect(() => {
    if (user) {
      navigate('/projects')
    }
  }, [user, navigate])

  const loginUser = async e => {
    e.preventDefault()

    mutate({ email, password })
    navigate('/projects')
    setEmail('')
    setPassword('')
  }

  return (
    <div className='p-8 min-h-screen flex items-center justify-center'>
      <form
        onSubmit={loginUser}
        className={
          'py-4 px-12 mb-4 rounded-md flex flex-col gap-y-2 w-3/6 mx-auto bg-neutral-800 text-neutral-300'
        }
      >
        <h1 className='font-black text-2xl text-center text-sky-500 mb-8'>
          Login Here
        </h1>
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
            placeholder='johndoe@gmail.com'
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
            placeholder='*********'
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
          Dont have acount{' '}
          <Link className='text-blue-400 underline' to={'/register'}>
            Register
          </Link>
        </div>
      </form>
    </div>
  )
}
export default LoginPage
