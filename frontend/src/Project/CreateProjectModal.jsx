import { useState } from 'react'
import { useCreateProject } from '../hooks/useProjectApi'
import Modal from '../components/Modal'

const CreateProjectModal = ({ setIsCreateModalOpen }) => {
  const [projectName, setProjectName] = useState('')
  const [projectDescription, setProjectDescription] = useState('')

  const createProjectMutation = useCreateProject()

  const handleCreateProject = e => {
    e.preventDefault()

    createProjectMutation.mutate({
      name: projectName,
      description: projectDescription
    })

    setProjectName('')
    setProjectDescription('')
    setIsCreateModalOpen(false)
  }

  return (
    <Modal setIsModalOpen={setIsCreateModalOpen} title={'Create Project'}>
      <form onSubmit={handleCreateProject} className='flex flex-col gap-y-4'>
        {/* Name Field */}
        <div className='flex gap-y-1 flex-col'>
          <label htmlFor='name' className='text-neutral-300'>
            Project name
          </label>
          <input
            type='text'
            name='name'
            value={projectName}
            autoFocus={true}
            placeholder={'Design web app..'}
            onChange={e => setProjectName(e.target.value)}
            className='p-2 border focus:outline-none focus:border-neutral-400 border-neutral-500 rounded-md'
          />
        </div>

        {/* Description Field */}
        <div className='flex gap-y-1 flex-col'>
          <label htmlFor='description' className='text-neutral-300'>
            Project description
          </label>
          <textarea
            type='text'
            name='description'
            value={projectDescription}
            onChange={e => setProjectDescription(e.target.value)}
            placeholder={
              'This project focuses on developing and designing web app.'
            }
            className='p-2 border focus:outline-none focus:border-neutral-400 border-neutral-500 rounded-md'
          />
        </div>

        {/* Submit Button */}
        <button className='p-2 font-semibold hover:bg-sky-800 hover:text-white rounded-md bg-sky-500 text-neutral-900 mt-4'>
          {createProjectMutation.isPending ? 'Creating...' : 'Submit'}
        </button>
      </form>
    </Modal>
  )
}
export default CreateProjectModal
