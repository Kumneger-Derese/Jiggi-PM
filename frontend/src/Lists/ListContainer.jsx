import {HiOutlineTrash} from "react-icons/hi2";
import {SortableContext, useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {TbEdit} from "react-icons/tb";
import {useGetCards, useMoveCard, useReorderCard} from "../hooks/useCardApi.js";
import {useMemo, useState} from "react";
import Card from "../Card/Card.jsx";
import EmptyCard from "../Card/EmptyCard.jsx";
import CreateCardModal from "../Card/CreateCardModal.jsx";
import UpdateCardModal from "../Card/UpdateCardModal.jsx";
import DeleteCardModal from "../Card/DeleteCardModal.jsx";
import {DndContext, DragOverlay, KeyboardSensor, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";
import {createPortal} from "react-dom";

const ListContainer = ({list, setIsUpdateModalOpen, setIsDeleteModalOpen, setSelectedList}) => {
    const [selectedCard, setSelectedCard] = useState(null);
    const [activeCard, setActiveCard] = useState(null);

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateCardModalOpen, setIsUpdateCardModalOpen] = useState(false);
    const [isDeleteCardModalOpen, setIsDeleteCardModalOpen] = useState(false);

    const moveCardMutation = useMoveCard()
    const reorderCardMutation = useReorderCard()
    const {data: cards, isLoading, isError, error} = useGetCards(list?.id)
    const cardIds = useMemo(() => cards?.map(card => card.id), [cards])

    const {
        listeners,
        isDragging,
        attributes,
        setNodeRef,
        transform,
        transition
    } = useSortable({
        id: list.id,
        data: {
            type: 'List',
            list
        }
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    const onDragStart = (event) => {
        if (event.active.data.current?.type === 'Card') {
            setActiveCard(event.active.data.current.card)
        }
    }

    const onDragOver = (event) => {
        const {active, over} = event
        if (!over) return

        const activeId = active.id
        const overId = over.id

        if (activeId === overId) return;

        const isActiveCard = active.data.current?.type === 'Card';
        const isOverCard = over.data.current?.type === 'Card';

        if (!isActiveCard) return;

        if (isActiveCard && isOverCard) {
            // reordering bn the same list
            reorderCardMutation.mutate({activeCardId: activeId, overCardId: overId, listId: list.id})
        }

        // reordering across lists
        const isOverList = over.data.current?.type === 'List';
        console.log({isOverList})

        if (isActiveCard && isOverList) {
            const newListId = over.data.current?.card?.listId
            moveCardMutation.mutate({activeId, overId, newListId})
        }
    }

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3
            }
        }),
        useSensor(KeyboardSensor)
    )

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className={'w-72 h-[480px] min-h-[480px] p-[3px] flex flex-col rounded-xl border-2 border-sky-600 bg-neutral-800 opacity-60'}/>
        )
    }

    // // Loading and error state
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
                {error.response?.data?.message}
            </div>
        )
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={'w-72 h-[450px] min-h-[450px] p-[3px] flex flex-col rounded-xl border border-neutral-600 bg-neutral-800'}>

            {/*List title*/}
            <div{...attributes} {...listeners}
                className={'font-semibold cursor-grab text-neutral-200 flex justify-between items-center bg-neutral-600 line-clamp-1 rounded-md p-2'}>

                <div className={'flex items-center justify-center py-1 px-2 rounded-full text-sm bg-neutral-800'}>
                    {cards?.length}
                </div>

                <button>{list.title}</button>
                {/*list action buttons*/}
                <div className={'flex gap-x-2 items-center'}>
                    {/* Delete Modal trigger */}
                    <HiOutlineTrash
                        onClick={() => {
                            setIsDeleteModalOpen(true)
                            setSelectedList(list)
                        }} size={20}
                        className={'text-neutral-400 hover:text-red-200'}/>

                    {/* Update modal trigger */}
                    <TbEdit
                        onClick={() => {
                            setIsUpdateModalOpen(true)
                            setSelectedList(list)
                        }}
                        size={20}
                        className={'text-neutral-400 hover:text-yellow-200'}/>
                </div>

            </div>

            {/*list tasks*/}
            <DndContext sensors={sensors} onDragStart={onDragStart} onDragOver={onDragOver}>
                <div className={'flex flex-col flex-1 p-2 overflow-x-hidden overflow-y-auto'}>
                    {cards?.length === 0 && <EmptyCard/>}
                    <SortableContext items={cardIds}>
                        {cards?.map((card) => (
                            <Card
                                card={card}
                                key={card.id}
                                setSelectedCard={setSelectedCard}
                                setIsDeleteCardModalOpen={setIsDeleteCardModalOpen}
                                setIsUpdateCardModalOpen={setIsUpdateCardModalOpen}
                            />
                        ))}
                    </SortableContext>
                </div>

                {createPortal(
                    <DragOverlay>
                        {activeCard ?
                            <Card
                                card={activeCard}
                                setSelectedCard={setSelectedCard}
                                setIsDeleteCardModalOpen={setIsDeleteCardModalOpen}
                                setIsUpdateCardModalOpen={setIsUpdateCardModalOpen}
                            /> : null}
                    </DragOverlay>,
                    document.body
                )}
            </DndContext>

            {/*add task button*/}
            <button onClick={() => setIsCreateModalOpen(true)}
                    className={'m-2 py-2 bg-sky-500 hover:ring-sky-100 transition-colors duration-300  ring-2 font-semibold text-neutral-800 rounded-md'}>
                Add Task
            </button>

            {/*Create Card Modal*/}
            {isCreateModalOpen && (
                <CreateCardModal
                    list={list}
                    position={cards.length + 1}
                    setIsCreateModalOpen={setIsCreateModalOpen}
                />
            )}

            {/* Update Card Modal*/}
            {isUpdateCardModalOpen && (
                <UpdateCardModal
                    list={list}
                    selectedCard={selectedCard}
                    setSelectedCard={setSelectedCard}
                    setIsUpdateCardModalOpen={setIsUpdateCardModalOpen}
                />
            )}

            {/* Delete Card Modal */}
            {isDeleteCardModalOpen && (
                <DeleteCardModal
                    selectedCard={selectedCard}
                    setSelectedCard={setSelectedCard}
                    setIsDeleteCardModalOpen={setIsDeleteCardModalOpen}
                />
            )}
        </div>
    );
};

export default ListContainer;