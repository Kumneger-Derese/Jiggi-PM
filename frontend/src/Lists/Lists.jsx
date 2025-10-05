import { useParams } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { useGetLists, useReorderList } from '../hooks/useListApi.js'
import { HiPlus } from 'react-icons/hi2'
import ListContainer from './ListContainer.jsx'
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { createPortal } from 'react-dom'
import CreateListModal from './CreateListModal.jsx'
import UpdateListModal from './UpdateListModal.jsx'
import DeleteListModal from './DeleteListModal.jsx'

const List = () => {
  const { projectId } = useParams()
  const [activeList, setActiveList] = useState(null) //set on drag start
  const [selectedList, setSelectedList] = useState(null) //to get listId for update

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const reorderListMutation = useReorderList()
  const {
    data: lists,
    isLoading: isGetListsLoading,
    isError: isGetListsError,
    error: getListsError
  } = useGetLists(projectId)

  const projectListIds = useMemo(() => lists?.map(list => list.id), [lists])

  // dnd context events for lists
  const onDragStart = e => {
    if (e.active.data.current?.type === 'List') {
      setActiveList(e.active.data.current.list)
    }
  }

  const onDragEnd = event => {
    const { active, over } = event
    if (!over) return

    const activeListId = active.id
    const overListId = over.id

    if (activeListId !== overListId) {
      reorderListMutation.mutate({
        projectId,
        body: { activeListId, overListId }
      })
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 3 } }),
    useSensor(KeyboardSensor)
  )

  // Loading and error state
  if (isGetListsLoading) {
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
  if (isGetListsError) {
    return (
      <div
        className={
          'min-h-screen flex items-center justify-center font-bold text-2xl text-red-500'
        }
      >
        {getListsError.response?.data?.message}
      </div>
    )
  }

  return (
    <div>
      {/*list header*/}
      <div className={'flex justify-between px-4 pt-6'}>
        <h2 className={'font-bold text-2xl text-neutral-200'}>
          {lists[0]?.project?.name}
        </h2>
        <button
          className='border bg-neutral-700 border-neutral-600 rounded-md py-2 px-4 font-semibold'
          onClick={() => setIsCreateModalOpen(true)}
        >
          Create List
        </button>
      </div>

      {/*Project wrapper*/}
      <div className='min-h-screen p-8 overflow-x-auto overflow-y-hidden flex flex-col m-auto w-full'>
        <DndContext
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          sensors={sensors}
        >
          {/*List wrapper*/}
          <div className='m-auto flex gap-4'>
            <div className={'flex gap-4'}>
              <SortableContext items={projectListIds}>
                {lists.map(list => (
                  <ListContainer
                    list={list}
                    key={list.id}
                    setSelectedList={setSelectedList}
                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                    setIsUpdateModalOpen={setIsUpdateModalOpen}
                  />
                ))}
              </SortableContext>
            </div>

            {/*create list button*/}
            <button
              className={
                'w-72 h-[450px] min-h-[450px] cursor-pointer hover:ring-2 ring-sky-500 hover:border-none flex items-center justify-center rounded-xl border border-neutral-400 bg-neutral-800 p-4'
              }
              onClick={() => setIsCreateModalOpen(true)}
            >
              <HiPlus size={40} strokeWidth={0.2} />
            </button>
          </div>

          {/* Portals*/}
          {createPortal(
            <DragOverlay>
              {activeList ? <ListContainer list={activeList} /> : null}
            </DragOverlay>,
            document.body
          )}
        </DndContext>

        {/* Create List Modal */}
        {isCreateModalOpen && (
          <CreateListModal
            projectId={projectId}
            setIsCreateModalOpen={setIsCreateModalOpen}
          />
        )}

        {/* Update List Modal */}
        {isUpdateModalOpen && (
          <UpdateListModal
            listId={selectedList?.id}
            setSelectedList={setSelectedList}
            setIsUpdateModalOpen={setIsUpdateModalOpen}
          />
        )}

        {/* Delete list Modal*/}
        {isDeleteModalOpen && (
          <DeleteListModal
            listId={selectedList.id}
            setSelectedList={setSelectedList}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
          />
        )}
      </div>
    </div>
  )
}
export default List
