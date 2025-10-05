import Modal from "../components/Modal.jsx";
import {useDeleteList} from "../hooks/useListApi.js";

const DeleteListModal = ({setIsDeleteModalOpen,listId,setSelectedList}) => {
    const deleteListMutation = useDeleteList();

    const handleDeleteList = () => {
        deleteListMutation.mutate(listId)

        setIsDeleteModalOpen(false)
        setSelectedList(null)
    }

    return (
        <Modal
            height='small'
            setIsModalOpen={setIsDeleteModalOpen}
            title={'Are you sure you want to delete this List?'}
        >
            <div className='p-4 flex gap-x-4'>
                <button
                    className='px-4 py-2 rounded-md border hover:bg-neutral-800 border-neutral-500 hover:border-neutral-600'
                    onClick={() => setIsDeleteModalOpen(false)}
                >
                    Cancel
                </button>

                <button
                    className='bg-red-500 hover:bg-red-600/60 px-4 py-2 rounded-md'
                    onClick={handleDeleteList}
                >
                    Delete
                </button>
            </div>
        </Modal>
    );
};

export default DeleteListModal;