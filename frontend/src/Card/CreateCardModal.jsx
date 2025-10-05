import React, {useState} from 'react';
import {useCreateCard} from "../hooks/useCardApi.js";
import Modal from "../components/Modal.jsx";

const CreateCardModal = ({setIsCreateModalOpen, position, list}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const createCardMutation = useCreateCard();

    const handleCreateCard = (e) => {
        e.preventDefault()
        createCardMutation.mutate({title, description, position, listId: list.id})

        setIsCreateModalOpen(false);
        setTitle('')
        setDescription('')
    }
    return (
        <Modal setIsModalOpen={setIsCreateModalOpen} title={'Create Task'} subTitle={list.title}>
            <form onSubmit={handleCreateCard} className='flex flex-col gap-y-4'>
                {/* Name Field */}
                <div className='flex gap-y-1 flex-col'>
                    <label htmlFor='title' className='text-neutral-300'>
                        Card name
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
                    {createCardMutation.isPending ? 'Creating...' : 'Submit'}
                </button>
            </form>
        </Modal>

    );
};

export default CreateCardModal;