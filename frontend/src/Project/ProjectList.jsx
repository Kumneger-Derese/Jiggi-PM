import { useState } from 'react'
import { HiPlus } from 'react-icons/hi2'
import Navbar from '../components/Navbar'
import ProjectCard from './ProjectCard.jsx'
import EditProjectModal from './EditProjectModal.jsx'
import CreateProjectModal from './CreateProjectModal.jsx'
import { useGetProjects } from '../hooks/useProjectApi.js'
import DeleteProjectModal from './DeleteProjectModal.jsx'

const ProjectList = () => {
  const [currentProjectId, setCurrentProjectId] = useState(null)

    // modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const { data: projects, isLoading, isError, error } = useGetProjects()

  if (isLoading) {
    return (
      <div
        className={
          'min-h-screen flex items-center justify-center font-bold text-2xl text-sky-500'
        }
      >
        Loading...
      </div>
    )
  }

  if (isError) {
    return (
      <div
        className={
          'min-h-screen flex items-center justify-center font-bold text-2xl text-red-500'
        }
      >
        {error?.response?.data?.message}
      </div>
    )
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

  return (
    <div className='pt-2 mb-8'>
      <Navbar />

      {/* Project Header */}
      <div className='flex justify-between items-center mb-8 mt-6'>
        <h1 className='font-bold text-xl'>({projects?.length})Projects</h1>

        <button
          onClick={handleCreateModalOpen}
          className='border bg-neutral-700 border-neutral-600 rounded-md py-2 px-4 font-semibold'
        >
          Create Project
        </button>
      </div>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
        {/* Create Project Card */}
        <div
          onClick={handleCreateModalOpen}
          className={
            'w-80 h-48 p-4 border border-neutral-600 rounded-xl flex items-center justify-center hover:bg-neutral-700 gap-y-4 bg-neutral-800 hover:text-sky-500 transition-colors duration-300'
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
          />
        ))}
      </div>

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
