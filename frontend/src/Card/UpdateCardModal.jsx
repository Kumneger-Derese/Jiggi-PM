import Modal from "../components/Modal.jsx";
import {useEffect, useState} from "react";
import {useGetCard, useUpdateCard} from "../hooks/useCardApi.js";

const UpdateCardModal = ({list, setIsUpdateCardModalOpen, selectedCard,setSelectedCard}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const {data: card} = useGetCard(selectedCard.id)
    const updateCardMutation = useUpdateCard()

    useEffect(() => {
        if (card) {
            setTitle(card.title);
            setDescription(card.description);
        }
    }, [card])

    const handleUpdateCard = (e) => {
        e.preventDefault()
        const cardId = selectedCard.id
        const body = {title, description}

        updateCardMutation.mutate({cardId, body})

        setIsUpdateCardModalOpen(false)
        setTitle('')
        setDescription('')
        setSelectedCard(null)
    }

    return (
        <Modal setIsModalOpen={setIsUpdateCardModalOpen} title={'Update Task'} subTitle={list.title}>
            <form onSubmit={handleUpdateCard} className='flex flex-col gap-y-4'>
                {/* Name Field */}
                <div className='flex gap-y-1 flex-col'>
                    <label htmlFor='title' className='text-neutral-300'>
                        Card title
                    </label>
                    <input
                        type='text'
                        name='title'
                        value={title}
                        autoFocus={true}
                        placeholder={'Plan an MVP'}
                        onChange={e => setTitle(e.target.value)}
                        className='p-2 border focus:outline-none focus:border-neutral-400 border-neutral-500 rounded-md'
                    />
                </div>

                {/* Description Field */}
                <div className='flex gap-y-1 flex-col'>
                    <label htmlFor='description' className='text-neutral-300'>
                        Card description
                    </label>
                    <textarea
                        name='description'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder={
                            'Plan an MVP in detail with co-workers as we are on kick off.'
                        }
                        className='p-2 border focus:outline-none focus:border-neutral-400 border-neutral-500 rounded-md'
                    />
                </div>

                {/* Submit Button */}
                <button
                    className='p-2 font-semibold hover:bg-sky-800 hover:text-white rounded-md bg-sky-500 text-neutral-900 mt-4'>
                    {updateCardMutation.isPending ? 'Updating...' : 'Submit'}
                </button>
            </form>
        </Modal>

    );
};

export default UpdateCardModal;