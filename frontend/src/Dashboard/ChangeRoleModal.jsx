import Modal from '../components/Modal'
import { useEffect, useState } from 'react'
import { useChangeRole } from '../hooks/useDashboardApi'

const ChangeRoleModal = ({
  selectedMember,
  setSelectedMember,
  setIsRoleModalOpen
}) => {
  const [role, setRole] = useState()

  const changeRoleMutation = useChangeRole()

  useEffect(() => {
    if (selectedMember) {
      setRole(selectedMember.role)
    }
  }, [selectedMember])

  const handleChangeRole = e => {
    e.preventDefault()
    const memberId = selectedMember.id
    const projectId = selectedMember.projectId

    changeRoleMutation.mutate({ memberId, projectId, role })
    setSelectedMember(null)
    setIsRoleModalOpen(false)
    setRole('')
  }

  return (
    <Modal
      title={'Change Team Role'}
      height='mid'
      setIsModalOpen={setIsRoleModalOpen}
    >
      <form onSubmit={handleChangeRole} className='flex flex-col gap-y-4'>
        {/* Role Field */}
        <div className='flex gap-y-1 flex-col'>
          <label htmlFor='name' className='text-neutral-300'>
            Role
          </label>
          <select
            type='text'
            name='name'
            value={role}
            autoFocus={true}
            placeholder={'Design web app..'}
            onChange={e => setRole(e.target.value)}
            className='p-2 border focus:outline-none focus:border-neutral-400 border-neutral-500 bg-neutral-600 text-neutral-200 rounded-md'
          >
            <option value='viewer'>Viewer</option>
            <option value='editor'>Editor</option>
          </select>
        </div>

        {/* Submit Button */}
        <button className='p-2 font-semibold hover:bg-sky-800 hover:text-white rounded-md bg-sky-500 text-neutral-900 mt-4'>
          {changeRoleMutation.isPending ? 'Updating...' : 'Update'}
        </button>
      </form>
    </Modal>
  )
}
export default ChangeRoleModal
