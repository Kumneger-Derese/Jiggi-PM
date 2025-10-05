import Modal from "../components/Modal.jsx";
import {useCreateList} from "../hooks/useListApi.js";
import {useState} from "react";

const CreateListModal = ({setIsCreateModalOpen, projectId}) => {
    const [title, setTitle] = useState('')

    const createListMutation = useCreateList(projectId)

    const handleCreateList = (e) => {
        e.preventDefault()
        createListMutation.mutate({projectId, body: {title}})

        setTitle('')
        setIsCreateModalOpen(false)
    }

    return (
        <Modal setIsModalOpen={setIsCreateModalOpen} title={'Create List'} height={'mid'}>
            <form onSubmit={handleCreateList} className={'flex flex-col'}>
                {/* Name Field */}
                <div className='flex gap-y-1 flex-col'>
                    <label htmlFor='name' className='text-neutral-300'>
                        List(column) title
                    </label>
                    <input
                        type='text'
                        name='name'
                        value={title}
                        placeholder={'Todo'}
                        autoFocus={true}
                        onChange={e => setTitle(e.target.value)}
                        className='p-2 border focus:outline-none focus:border-neutral-400 border-neutral-500 rounded-md'
                    />
                </div>

                {/* Submit Button */}
                <button
                    className='px-8 py-2 mt-8 w-fit font-semibold hover:bg-sky-800 hover:text-white rounded-md bg-sky-500 text-neutral-900'>
                    {createListMutation.isPending ? 'Creating...' : 'Submit'}
                </button>
            </form>
        </Modal>
    );
};

export default CreateListModal;