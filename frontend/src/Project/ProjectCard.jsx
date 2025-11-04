import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import { FcInvite } from 'react-icons/fc'

const ProjectCard = ({
  project,
  handleDeleteModalOpen,
  handleUpdateModalOpen,
  handleSendInviteModal
}) => {
  return (
    <div
      key={project.id}
      className={
        'w-[355px] md:w-80 h-48 border border-neutral-700 p-4 rounded-xl flex flex-col gap-y-4 bg-neutral-800'
      }
    >
      <h1 className={'text-3xl font-bold line-clamp-1'}>{project.name}</h1>
      <h2 className={'text-neutral-400 flex-1 line-clamp-2'}>
        {project.description}
      </h2>

      {/* Action Button */}
      <div className='flex justify-between items-center'>
        <Link
          className='px-4 py-2 rounded-md hover:text-sky-400 w-fit bg-neutral-600 font-semibold'
          to={`/projects/${project.id}`}
        >
          Start Project
        </Link>

        <div className='flex gap-x-2'>
          <FcInvite
            size={32}
            strokeWidth={2}
            onClick={() => handleSendInviteModal(project.id)}
            className='p-2 hover:text-green-400 rounded-md bg-neutral-600'
          />

          <HiOutlineTrash
            size={32}
            strokeWidth={2}
            onClick={() => handleDeleteModalOpen(project.id)}
            className='p-2 hover:text-red-400 rounded-md bg-neutral-600'
          />

          <HiOutlinePencil
            size={32}
            strokeWidth={2}
            onClick={() => handleUpdateModalOpen(project.id)}
            className='p-2 hover:text-yellow-600 rounded-md bg-neutral-600'
          />
        </div>
      </div>
    </div>
  )
}
export default ProjectCard
