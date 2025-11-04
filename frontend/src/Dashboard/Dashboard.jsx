import { useState } from 'react'
import Loading from '../components/Loading.jsx'
import ChangeRoleModal from './ChangeRoleModal.jsx'
import RemoveTeamModal from './RemoveTeamModal.jsx'
import ComponentError from '../components/ComponentError.jsx'
import { useGetDashboardData } from '../hooks/useDashboardApi.js'
import { Link } from 'react-router-dom'
import { HiChevronLeft, HiMiniUserCircle } from 'react-icons/hi2'
import TeamList from './TeamList.jsx'

const Dashboard = () => {
  const [selectedMember, setSelectedMember] = useState(null)
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false)
  const [isRemoveTeamModalOpen, setIsRemoveTeamModalOpen] = useState(false)

  const {
    data: dashboardData,
    isLoading,
    isError,
    error
  } = useGetDashboardData()

  const { counts, members, memberCount } = dashboardData ?? []
  const {
    projectCount,
    listCount,
    cardCount,
    completedCardCount,
    invitedCount
  } = counts ?? {}

  const data = [
    {
      id: 1,
      title: 'Projects',
      content: `You have ${projectCount} projects to accomplish.`
    },
    {
      id: 2,
      title: 'Lists',
      content: `You have ${listCount} lists to sort.`
    },
    {
      id: 3,
      title: 'Cards',
      content: `You have ${cardCount} Tasks to manage.`
    },
    {
      id: 4,
      title: 'Completed Cards',
      content: `You have completed ${completedCardCount} tasks.`
    },
    {
      id: 5,
      title: 'Invited Projects',
      content: `You have invited to ${invitedCount} projects to accomplish.`
    }
  ]

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <ComponentError message={error?.response?.data?.message} />
  }

  return (
    <div className={'p-4 sm:p-8'}>
      <div className={'mb-8 flex justify-between'}>
        <div className='flex gap-2 items-center'>
          <Link to={'/projects'}>
            <HiChevronLeft
              strokeWidth={1.2}
              size={24}
              className='text-neutral-500 hover:text-sky-500'
            />
          </Link>
          <h1 className={'font-bold text-xl'}>Dashboard</h1>
        </div>
        <Link
          to={'/profile'}
          className='border bg-neutral-700 border-neutral-600 rounded-md py-2 px-4 font-semibold flex items-center gap-4'
        >
          <HiMiniUserCircle size={24} /> Profile
        </Link>
      </div>

      <section
        className={'grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3'}
      >
        {data?.map(item => (
          <div
            key={item.id}
            className={`h-36 p-8 gap-2 flex flex-col justify-center rounded-md bg-linear-150 border 
                        border-neutral-500 from-neutral-600 to-neutral-800`}
          >
            <h1 className={'font-bold text-xl'}>{item.title}</h1>
            <p className={'text-neutral-400/90'}>{item.content}</p>
          </div>
        ))}
      </section>

      {/* Team table */}
      <section className={'mt-8'}>
        {/*Table Header Count*/}
        <div>
          {members?.length > 0 && (
            <h1 className={'font-bold text-xl mb-4'}>
              ({memberCount}) Team Members
            </h1>
          )}
        </div>

        {/*Team List Header*/}
        {members && members.length > 0 && (
          <div
            className={
              'sm:grid mb-4 hidden py-2 font-bold border border-neutral-600  sm:grid-cols-5 gap-x-4 rounded-md bg-neutral-700 sm:items-center px-2'
            }
          >
            <p>Username</p>
            <p>Project</p>
            <p>Role</p>
            <p>Action</p>
          </div>
        )}

        <div>
          {members &&
            members.length > 0 &&
            members.map(member => (
              <TeamList
                key={member.id}
                member={member}
                setSelectedMember={setSelectedMember}
                setIsRoleModalOpen={setIsRoleModalOpen}
                setIsRemoveTeamModalOpen={setIsRemoveTeamModalOpen}
              />
            ))}
        </div>
      </section>

      {/* Change Role Modal */}
      {isRoleModalOpen && (
        <ChangeRoleModal
          selectedMember={selectedMember}
          setSelectedMember={setSelectedMember}
          setIsRoleModalOpen={setIsRoleModalOpen}
        />
      )}

      {/* Delete Team Member Modal */}
      {isRemoveTeamModalOpen && (
        <RemoveTeamModal
          selectedMember={selectedMember}
          setSelectedMember={setSelectedMember}
          setIsRemoveTeamModalOpen={setIsRemoveTeamModalOpen}
        />
      )}
    </div>
  )
}
export default Dashboard
