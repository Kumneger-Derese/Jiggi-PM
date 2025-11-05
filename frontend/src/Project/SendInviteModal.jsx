import {useSendInvite} from "../hooks/useInviteApi.js";
import {useState} from "react";
import Modal from "../components/Modal.jsx";

const SendInviteModal = ({currentProjectId,setIsSendInviteModalOpen}) => {
    const [email, setEmail] = useState('')

    const sendInviteMutation = useSendInvite()


    const handleSendInvite = () => {
        sendInviteMutation.mutate({projectId: currentProjectId, body: {email}})

        setEmail('')
        setIsSendInviteModalOpen(false)
    }

    if(sendInviteMutation.isPending){
        return (
            <div
                className={'min-h-screen flex items-center justify-center font-bold bg-neutral-800 text-neutral-200'}
            >
                Sending Email...
            </div>
        )
    }

    return (
        <Modal setIsModalOpen={setIsSendInviteModalOpen} height={'mid'} title={'Invite Modal'}>
            <div className={'flex flex-col gap-y-2'}>
                <label htmlFor="email" className={'text-neutral-300'}>Invitee Email</label>
                <input
                    id='email'
                    type="email"
                    value={email}
                    placeholder={'bobteam@gmail.com'}
                    autoFocus={true}
                    className={'p-2 rounded-md border border-neutral-500 focus:outline-none '}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <button
                    onClick={handleSendInvite}
                    className={'bg-sky-600 w-fit px-8 disabled:bg-neutral-500 hover:bg-sky-500 font-semibold py-2 mt-4 rounded-md'}>
                    Send Invitation
                </button>
            </div>
        </Modal>
    );
};

export default SendInviteModal;