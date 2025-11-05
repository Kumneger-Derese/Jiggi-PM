import { useParams } from 'react-router-dom'
import { useAcceptInvite, useVerifyInvite } from '../hooks/useInviteApi.js'
import Loading from '../components/Loading.jsx'
import ComponentError from '../components/ComponentError.jsx'

const InvitationPage = () => {
  const { token } = useParams()
  console.log('frontend', { token })
  const acceptInviteMutation = useAcceptInvite()
  const { data, isLoading, isError, error } = useVerifyInvite(token)

  const handleAcceptInvite = () => {
    acceptInviteMutation.mutate({ token })
  }

  if (isLoading) {
    return <Loading  />
  }

  if (isError) {
    return <ComponentError message={error?.response?.data?.message} />
  }

  return (
    <div className={'min-h-screen flex items-center justify-center'}>
      <div className={'w-3/6 py-8 mt-8  rounded-md bg-neutral-700 p-8'}>
        <h1 className={'text-2xl font-bold mb-4 text-neutral-200'}>
          {data && 'Invitation Verified'}
        </h1>

        <div>
          <h2 className={'text-lg font-semibold'}>
            You invited to Project {data?.projectName}
          </h2>
          <p className={'text-neutral-200'}>
            Inviter name: <span>{data?.inviter?.username}</span>
          </p>
          <p className={'text-neutral-200'}>
            Inviter email: <span>{data?.inviter?.email}</span>
          </p>
          <p className={'text-neutral-200'}>
            Invitee email: <span>{data?.email}</span>
          </p>
          <p className={'text-neutral-300'}>
            Invitation status: <span>{data?.status}</span>
          </p>

          <p className={'text-neutral-300'}>
            Expires at: <span>{new Date(data?.expiresAt).toDateString()}</span>
          </p>
        </div>

        <button
          onClick={handleAcceptInvite}
          disabled={data?.status === 'accepted'}
          className={
            'bg-sky-600 disabled:bg-neutral-500 hover:bg-sky-400 font-medium py-2 px-6 mt-4 rounded-md'
          }
        >
          Accept Invitation
        </button>
      </div>
    </div>
  )
}

export default InvitationPage
