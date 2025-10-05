import Modal from '../components/Modal'
import {useEffect, useState} from 'react'
import {useGetProject, useUpdateProject} from '../hooks/useProjectApi'

const EditProjectModal = ({setIsUpdateModalOpen, currentProjectId}) => {
    const [projectName, setProjectName] = useState('')
    const [projectDescription, setProjectDescription] = useState('')

    const {data: project} = useGetProject(currentProjectId)
    const updateProjectMutation = useUpdateProject()

    useEffect(() => {
        if (project && currentProjectId) {
            setProjectName(project?.name)
            setProjectDescription(project?.description)
        }
    }, [project, currentProjectId])

    const handleUpdateProject = e => {
        e.preventDefault()

        updateProjectMutation.mutate({
            projectId: currentProjectId,
            body: {name: projectName, description: projectDescription}
        })

        setProjectName('')
        setProjectDescription('')
        setIsUpdateModalOpen(false)
    }
    return (
        <Modal setIsModalOpen={setIsUpdateModalOpen} title={'Update Project'}>
            <form onSubmit={handleUpdateProject} className='flex flex-col gap-y-4'>
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
                <button
                    className='p-2 font-semibold hover:bg-sky-800 hover:text-white rounded-md bg-sky-500 text-neutral-900 mt-4'>
                    {updateProjectMutation.isPending ? 'Updating...' : 'Update'}
                </button>
            </form>
        </Modal>
    )
}
export default EditProjectModal
