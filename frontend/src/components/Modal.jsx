import {HiXMark} from 'react-icons/hi2'

const Modal = ({children, setIsModalOpen, title, height = 'large', subTitle = ''}) => {
    const modalHeight = {
        large: '350px',
        mid: '250px',
        small: '200px',
    }

    return (
        <div>
            <div className='fixed inset-0 size-full bg-neutral-800/70'/>

            <div
                style={{height: modalHeight[height]}}
                className='p-8 z-50  fixed w-5/6 sm:w-3/6 inset-0 rounded-xl m-auto bg-neutral-700'
            >
                <button
                    className='absolute hover:text-red-400 top-6 right-6'
                    onClick={() => setIsModalOpen(false)}
                >
                    <HiXMark size={24}/>
                </button>
                <h1 className='font-bold text-xl mb-4'>{title} <span className={'text-neutral-400'}>{subTitle && `- ${subTitle}`}</span></h1>

                {children}
            </div>
        </div>
    )
}
export default Modal
