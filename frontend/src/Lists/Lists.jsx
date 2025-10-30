import {Link, useParams} from 'react-router-dom'
import {useEffect, useMemo, useState} from 'react'
import {useGetLists, useReorderList} from '../hooks/useListApi.js'
import {HiChevronLeft, HiPlus} from 'react-icons/hi2'
import ListContainer from './ListContainer.jsx'
import {DndContext, DragOverlay, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors} from '@dnd-kit/core'
import {horizontalListSortingStrategy, SortableContext} from '@dnd-kit/sortable'
import {createPortal} from 'react-dom'
import CreateListModal from './CreateListModal.jsx'
import UpdateListModal from './UpdateListModal.jsx'
import DeleteListModal from './DeleteListModal.jsx'
import {useMoveCard, useReorderCard} from '../hooks/useCardApi.js'
import Card from '../Card/Card.jsx'
import {socket} from '../socket.js'
import {useQueryClient} from '@tanstack/react-query'
import {useGetProject} from '../hooks/useProjectApi.js'
import Loading from '../components/Loading.jsx'
import ComponentError from '../components/ComponentError.jsx'
import {restrictToWindowEdges} from "@dnd-kit/modifiers";

const List = () => {
    const {projectId} = useParams()
    const [activeList, setActiveList] = useState(null) //set on drag start
    const [activeCard, setActiveCard] = useState(null)
    const [selectedList, setSelectedList] = useState(null) //to get listId for update

    // modals state
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    // card and list fetching and mutation
    const moveCardMutation = useMoveCard(activeCard)
    const reorderCardMutation = useReorderCard()
    const reorderListMutation = useReorderList()
    const {
        data: lists,
        isLoading: isGetListsLoading,
        isError: isGetListsError,
        error: getListsError
    } = useGetLists(projectId)
    const {data: project, isLoading, isError, error} = useGetProject(projectId)

    const queryClient = useQueryClient()
    const projectListIds = useMemo(() => lists?.map(list => list.id), [lists])

    useEffect(() => {
        socket.connect()

        socket.emit('joinListRoom', projectId)
        socket.on('syncList', ({projectId, listId}) => {
            queryClient.invalidateQueries({queryKey: ['lists', listId]})
            queryClient.invalidateQueries({queryKey: ['lists', projectId]})
        })

        return () => {
            socket.off('joinListRoom')
            socket.off('syncList')
            socket.disconnect()
        }
    }, [projectId, queryClient])

    // --- DND Handlers ---
    const onDragStart = e => {
        if (e.active.data.current?.type === 'List') {
            setActiveList(e.active.data.current.list)
        }

        if (e.active.data.current?.type === 'Card') {
            setActiveCard(e.active.data.current.card)
        }
    }

    const onDragOver = event => {
        const {active, over} = event

        if (!over || active.id === over.id) return

        // We are only interested in dragging cards over other CARDS for in-list reordering
        const isActiveCard = active.data.current?.type === 'Card'
        const isOverCard = over.data.current?.type === 'Card'

        if (!isActiveCard || !isOverCard) return

        const activeCardListId = active.data.current?.card.listId
        const overCardListId = over.data.current.card.listId

        // Scenario 1: Card reordering WITHIN the same list (for smooth visuals)
        if (activeCardListId === overCardListId) {
            reorderCardMutation.mutate({
                activeCardId: active.id,
                overCardId: over.id,
                listId: activeCardListId
            })
        }
    }

    const onDragEnd = event => {
        const {active, over} = event

        // Cleanup active items regardless of drop success
        setActiveList(null)
        setActiveCard(null)

        if (!over) return

        const activeIsList = active.data.current?.type === 'List'
        const activeIsCard = active.data.current?.type === 'Card'

        // 1. LIST REORDERING LOGIC (first)
        if (activeIsList) {
            const activeListId = active.id
            const overListId = over.id

            // Reorder List only if it landed on a DIFFERENT list item
            if (activeListId !== overListId) {
                reorderListMutation.mutate({
                    projectId,
                    body: {activeListId, overListId}
                })
            }
            return // Exit after list handling
        }

        // 2. CARD MOVE/REORDER LOGIC
        if (activeIsCard) {
            const activeCardId = active.id
            const activeCardListId = active.data.current?.card.listId

            const isOverCard = over.data.current?.type === 'Card'
            const isOverList = over.data.current?.type === 'List'

            let overListId = null
            let overCardId = null // Will be null if dropped on the list container

            if (isOverCard) {
                overListId = over.data.current.card.listId
                overCardId = over.id // Dropped on a specific card
            } else if (isOverList) {
                overListId = over.id // Dropped on the list container itself
                // overCardId remains null -> signals "place at end" to backend
            } else {
                return // Dropped outside a valid zone
            }

            // Check if the card MOVED lists (This is the final commit)
            if (activeCardListId !== overListId) {
                moveCardMutation.mutate({
                    activeCardId,
                    overCardId,
                    newListId: overListId
                })
            }
        }
    }

    const sensors = useSensors(
        useSensor(PointerSensor, {activationConstraint: {distance: 5}}),
        useSensor(KeyboardSensor),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 100,
                tolerance: 8
            }
        })
    )

    // Loading and error state
    if (isGetListsLoading) {
        return <Loading/>
    }
    if (isLoading) {
        return <Loading/>
    }

    if (isGetListsError) {
        return <ComponentError message={getListsError.response?.data?.message}/>
    }

    if (isError) {
        return <ComponentError message={error.response?.data?.message}/>
    }

    return (
        <div>
            {/*list header*/}
            <div className={'flex justify-between items-center px-4 pt-6 relative'}>
                {/* back button */}
                <Link to={'/projects'}>
                    <HiChevronLeft
                        strokeWidth={1.2}
                        size={24}
                        className='text-neutral-500 hover:text-sky-500'
                    />
                </Link>

                {/* Project name */}
                <h2 className={'font-bold text-2xl capitalize text-neutral-200'}>
                    {project?.name}
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
                    sensors={sensors}
                    onDragEnd={onDragEnd}
                    onDragOver={onDragOver}
                    onDragStart={onDragStart}
                    modifiers={[restrictToWindowEdges]}
                    autoScroll={true}
                >
                    {/*List wrapper*/}
                    <div className='m-auto flex gap-4'>
                        <div className={'flex gap-4'}>
                            <SortableContext
                                items={projectListIds}
                                strategy={horizontalListSortingStrategy}
                            >
                                {lists?.map(list => (
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
                            <HiPlus size={40} strokeWidth={0.2}/>
                        </button>
                    </div>

                    {/* Portals*/}
                    {createPortal(
                        <DragOverlay>
                            {activeList ? <ListContainer list={activeList}/> : null}
                            {activeCard ? <Card card={activeCard}/> : null}
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
