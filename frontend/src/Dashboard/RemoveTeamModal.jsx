import Modal from '../components/Modal'
import { useRemoveTeamMember } from '../hooks/useDashboardApi'

const RemoveTeamModal = ({
  selectedMember,
  setSelectedMember,
  setIsRemoveTeamModalOpen
}) => {
  const removeTeamMemberMutation = useRemoveTeamMember()

  const handleRemoveTeamMember = () => {
    const memberId = selectedMember.id
    const projectId = selectedMember.projectId

    removeTeamMemberMutation.mutate({ memberId, projectId })
    setIsRemoveTeamModalOpen(false)
    setSelectedMember('')
  }
  return (
    <Modal
      height='small'
      setIsModalOpen={setIsRemoveTeamModalOpen}
      title={'Are you sure you want to remove this member?'}
    >
      <div className='p-4 flex gap-x-4'>
        <button
          className='px-4 py-2 rounded-md border hover:bg-neutral-800 border-neutral-500 hover:border-neutral-600'
          onClick={() => setIsRemoveTeamModalOpen(false)}
        >
          Cancel
        </button>

        <button
          className='bg-red-500 hover:bg-red-600/60 px-4 py-2 rounded-md'
          onClick={handleRemoveTeamMember}
          disabled={removeTeamMemberMutation.isPending}
        >
          Delete
        </button>
      </div>
    </Modal>
  )
}
export default RemoveTeamModal
