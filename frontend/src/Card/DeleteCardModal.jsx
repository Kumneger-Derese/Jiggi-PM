import Modal from "../components/Modal.jsx";
import {useDeleteCard} from "../hooks/useCardApi.js";

const DeleteCardModal = ({setIsDeleteCardModalOpen, selectedCard, setSelectedCard}) => {
    const deleteCardMutation = useDeleteCard()


    const handleDeleteCard = () => {
        deleteCardMutation.mutate(selectedCard?.id)

        setIsDeleteCardModalOpen(false)
        setSelectedCard(null);
    }
    return (
        <Modal
            height='small'
            setIsModalOpen={setIsDeleteCardModalOpen}
            title={'Are you sure you want to delete this Card?'}
        >
            <div className='p-4 flex gap-x-4'>
                <button
                    className='px-4 py-2 rounded-md border hover:bg-neutral-800 border-neutral-500 hover:border-neutral-600'
                    onClick={() => setIsDeleteCardModalOpen(false)}
                >
                    Cancel
                </button>

                <button
                    className='bg-red-500 hover:bg-red-600/60 px-4 py-2 rounded-md'
                    onClick={handleDeleteCard}
                >
                    Delete
                </button>
            </div>
        </Modal>
    );
};

export default DeleteCardModal;