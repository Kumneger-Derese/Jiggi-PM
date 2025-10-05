import {useEffect, useState} from "react";
import Modal from "../components/Modal.jsx";
import {useGetList, useUpdateList} from "../hooks/useListApi.js";

const UpdateListModal = ({setIsUpdateModalOpen, listId,setSelectedList}) => {
    const [title, setTitle] = useState('')

    const {data: list, isSuccess} = useGetList(listId)
    const updateListMutation = useUpdateList();

    // set update title initial placeholder
    useEffect(() => {
        if (isSuccess && list) {
            setTitle(list?.title ? list?.title : "Loading")
        }
    }, [list, isSuccess])

    const handleUpdateList = (e) => {
        e.preventDefault()

        updateListMutation.mutate({listId, body: {title}})

        setTitle('')
        setIsUpdateModalOpen(false)
        setSelectedList(null)
    }

    return (
        <Modal setIsModalOpen={setIsUpdateModalOpen} title={'Update List'} height={'mid'}>
            <form onSubmit={handleUpdateList} className={'flex flex-col'}>
                {/* Name Field */}
                <div className='flex gap-y-1 flex-col'>
                    <label htmlFor='name' className='text-neutral-300'>
                        List(column) title
                    </label>
                    <input
                        type='text'
                        name='name'
                        value={title}
                        autoFocus={true}
                        onChange={e => setTitle(e.target.value)}
                        className='p-2 border focus:outline-none focus:border-neutral-400 border-neutral-500 rounded-md'
                    />
                </div>

                {/* Submit Button */}
                <button
                    className='px-8 py-2 mt-8 w-fit font-semibold hover:bg-sky-800 hover:text-white rounded-md bg-sky-500 text-neutral-900'>
                    {updateListMutation.isPending ? 'Updating...' : 'Submit'}
                </button>
            </form>
        </Modal>
    );
};

export default UpdateListModal;