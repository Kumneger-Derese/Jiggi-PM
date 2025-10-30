import { useEffect, useState } from 'react'
import { HiPlus } from 'react-icons/hi2'
import Navbar from '../components/Navbar'
import ProjectCard from './ProjectCard.jsx'
import EditProjectModal from './EditProjectModal.jsx'
import CreateProjectModal from './CreateProjectModal.jsx'
import { useGetProjects } from '../hooks/useProjectApi.js'
import DeleteProjectModal from './DeleteProjectModal.jsx'
import SendInviteModal from './SendInviteModal.jsx'
import { useInvitedProjects } from '../hooks/useInviteApi.js'
import InvitedProjectCard from './InvitedProjectCard.jsx'
import { socket } from '../socket.js'
import { useQueryClient } from '@tanstack/react-query'
import ComponentError from '../components/ComponentError.jsx'
import Loading from '../components/Loading.jsx'

const ProjectList = () => {
  const [currentProjectId, setCurrentProjectId] = useState(null)

  // modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isSendInviteModalOpen, setIsSendInviteModalOpen] = useState(false)

  const queryClient = useQueryClient()
  const { data: invitedProjects } = useInvitedProjects()
  const { data: projects, isLoading, isError, error } = useGetProjects()

  useEffect(() => {
    socket.emit('invitedProjectList')

    socket.on('syncInvitedProjectList', () => {
      queryClient.invalidateQueries({ queryKey: ['invite'] })
    })

    return () => {
      socket.off('invitedProjectList')
      socket.off('syncInvitedProjectList')
    }
  }, [currentProjectId, queryClient])

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <ComponentError message={error?.response?.data?.message} />
  }

  // modals state handler
  const handleCreateModalOpen = () => setIsCreateModalOpen(true)

  const handleDeleteModalOpen = projectId => {
    setIsDeleteModalOpen(true)
    setCurrentProjectId(projectId)
  }

  const handleUpdateModalOpen = projectId => {
    setIsUpdateModalOpen(true)
    setCurrentProjectId(projectId)
  }

  const handleSendInviteModal = projectId => {
    setCurrentProjectId(projectId)
    setIsSendInviteModalOpen(true)
  }

  return (
    <div className='sm:pt-2 mb-8 px-2'>
      <Navbar />

      {/* Project Header */}
      <div className='flex justify-between items-center  mb-8 mt-6'>
        <h1 className='font-bold text-xl'>({projects?.length})Projects</h1>

        <button
          onClick={handleCreateModalOpen}
          className='border bg-neutral-700 border-neutral-600 rounded-md py-2 px-4 font-semibold'
        >
          Create Project
        </button>
      </div>

      <div className='grid grid-cols-1 place-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {/* Create Project Card */}
        <div
          onClick={handleCreateModalOpen}
          className={
            'w-[355px] md:w-80 h-48 p-4 border border-neutral-600 rounded-xl flex items-center justify-center hover:bg-neutral-700 gap-y-4 bg-neutral-800 hover:text-sky-500 transition-colors duration-300'
          }
        >
          <HiPlus size={40} strokeWidth={0.2} />
        </div>

        {/* Project list card */}
        {projects?.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            handleUpdateModalOpen={handleUpdateModalOpen}
            handleDeleteModalOpen={handleDeleteModalOpen}
            handleSendInviteModal={handleSendInviteModal}
          />
        ))}
      </div>

      {/*Invited Project list if available */}
      {invitedProjects?.length > 0 && (
        <section className={'flex flex-col gap-y-4 mt-8'}>
          <h1 className='font-bold text-xl'>
            {' '}
            ({invitedProjects?.length}) Invited Projects
          </h1>

          <div className='grid grid-cols-1 place-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {invitedProjects?.map(p => (
              <InvitedProjectCard key={p.id} p={p} />
            ))}
          </div>
        </section>
      )}

      {/* Send Invite Modal */}
      {isSendInviteModalOpen && (
        <SendInviteModal
          currentProjectId={currentProjectId}
          setIsSendInviteModalOpen={setIsSendInviteModalOpen}
        />
      )}

      {/* Delete Project Modal */}
      {isDeleteModalOpen && (
        <DeleteProjectModal
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          currentProjectId={currentProjectId}
        />
      )}

      {/* Create Project Modal */}
      {isCreateModalOpen && (
        <CreateProjectModal setIsCreateModalOpen={setIsCreateModalOpen} />
      )}

      {/* Update Project Modal */}
      {isUpdateModalOpen && (
        <EditProjectModal
          setIsUpdateModalOpen={setIsUpdateModalOpen}
          currentProjectId={currentProjectId}
        />
      )}
    </div>
  )
}

export default ProjectList
