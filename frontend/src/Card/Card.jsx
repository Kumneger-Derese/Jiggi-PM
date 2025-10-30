import {HiOutlineCheck, HiOutlineTrash} from "react-icons/hi2";
import {HiOutlinePencilAlt} from "react-icons/hi";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {useState} from "react";
import {useCompleteCard} from "../hooks/useCardApi.js";

const Card = ({card, setIsUpdateCardModalOpen, setIsDeleteCardModalOpen, setSelectedCard}) => {
    const [mouseOver, setMouseOver] = useState(false);
    const completeCardMutation = useCompleteCard()

    const {
        listeners,
        attributes,
        isDragging,
        setNodeRef,
        transform,
        transition
    } = useSortable({
        id: card?.id,
        data: {
            type: 'Card',
            card
        }
    })

    const handleCompleteCard = () => {
        completeCardMutation.mutate({
            cardId: card?.id
        })
    }

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        touchAction:'none',
        backgroundColor: card.isCompleted ? '#262626' : ''
    }

    if (isDragging) {
        return (
            <div
                style={style}
                ref={setNodeRef}
                className={`m-2 p-4 rounded-md opacity-40 bg-neutral-600 h-32
                 min-h-32 flex flex-col gap-2 ring-2 ring-sky-500`}
            />
        )
    }

    const toggleCardStyle = {
        textDecorationLine: card.isCompleted ? 'line-through' : '',
        textDecorationThickness: card.isCompleted ? '2px' : '',
        textDecorationColor: card.isCompleted ? 'oklch(68.5% 0.169 237.323)' : '',
        color: card.isCompleted ? '#a29e9e' : '',
    }

    return (
        <div
            {...attributes}
            {...listeners}
            style={style}
            ref={setNodeRef}
            onMouseEnter={() => setMouseOver(true)}
            onMouseLeave={() => setMouseOver(false)}
            className={`m-2 p-4 hover:ring-2 hover:ring-offset hover:ring-sky-500 hover:border-none rounded-md
             bg-neutral-700 min-h-32 h-32 flex flex-col gap-2 border border-neutral-600 cursor-grab`}
        >
            <div className={'flex-1 flex flex-col gap-2 overflow-y-auto'}>
                <h2 style={toggleCardStyle} className={`font-semibold`}>{card.title}</h2>
                <div style={toggleCardStyle} className={`text-sm text-neutral-400`}>{card.description}</div>
            </div>

            {/*Card action buttons*/}
            {
                mouseOver && (
                    <div className={'self-end  flex gap-x-2 text-neutral-400'}>
                        <HiOutlineCheck
                            onClick={handleCompleteCard}
                            strokeWidth={2}
                            className={'hover:text-green-400'}/>

                        <HiOutlineTrash
                            onClick={() => {
                                setSelectedCard(card)
                                setIsDeleteCardModalOpen(true)
                            }}
                            className={'hover:text-red-300'}/>

                        <HiOutlinePencilAlt
                            onClick={() => {
                                setSelectedCard(card)
                                setIsUpdateCardModalOpen(true)
                            }}
                            className={'hover:text-yellow-300'}/>
                    </div>
                )
            }
        </div>
    );
};

export default Card;