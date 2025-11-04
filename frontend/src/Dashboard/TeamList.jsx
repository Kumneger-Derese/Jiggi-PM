import React from 'react'

const TeamList = ({
  member,
  setIsRemoveTeamModalOpen,
  setIsRoleModalOpen,
  setSelectedMember
}) => {
  return (
    <div
      className={
        'grid sm:grid-cols-4 p-2  mb-4 gap-y-2 sm:gap-y-4 rounded-md bg-neutral-700 sm:items-center sm:px-2 sm:py-0'
      }
    >
      <p className={'capitalize font-bold'}>
        <span className='sm:hidden font-normal mr-4'>Name:</span>
        {member?.user?.username}
      </p>
      <p>
        <span className='sm:hidden mr-4'>Project:</span>
        {member?.project?.name}
      </p>
      <p>
        <span className='sm:hidden mr-4'>Role:</span>
        {member?.role}
      </p>

      {/* action button */}
      <div className={'flex items-center space-x-4 sm:p-2'}>
        <button
          className={'bg-yellow-600 text-sm px-2 py-2 rounded-md font-medium'}
          onClick={() => {
            setIsRoleModalOpen(true)
            setSelectedMember(member)
          }}
        >
          Change Role
        </button>

        <button
          className={
            'bg-rose-600 hover:bg-rose-800 text-sm px-2 py-2 rounded-md font-medium'
          }
          onClick={() => {
            setIsRemoveTeamModalOpen(true)
            setSelectedMember(member)
          }}
        >
          Delete Member
        </button>
      </div>
    </div>
  )
}

export default TeamList
