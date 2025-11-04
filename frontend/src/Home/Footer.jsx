import {
  FaCopy,
  FaCopyright,
  FaFacebook,
  FaGoogle,
  FaInstagram,
  FaRegCopyright,
  FaXTwitter
} from 'react-icons/fa6'
import { footetData } from '../constants/footer'

const Footer = () => {
  return (
    <div id='resource' className='flex flex-col gap-y-16'>
      <div className='flex flex-col sm:flex-row gap-8 justify-between'>
        <div className='text-center sm:text-left'>
          <h1 className='text-sky-500 font-bold text-2xl'>Jiggi</h1>
          <p className='font-medium text-neutral-500'>PM made Brezee.</p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-auto sm:m-0'>
          {footetData.map(footer => (
            <div key={footer.id} className='flex flex-col gap-y-4'>
              <h1 className='font-bold text-lg'>{footer.title}</h1>

              <ul className='text-neutral-400'>
                {footer.content.map(content => (
                  <li key={content}>{content}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className='flex flex-col gap-4 justify-between p-4 mb-4 rounded-md bg-neutral-800 items-center sm:flex-row'>
        <div className='flex gap-x-1 items-center'>
          <FaRegCopyright /> 2025 Jiggi. All rights resrved.
        </div>

        <div className='flex gap-4'>
          <FaFacebook />
          <FaXTwitter />
          <FaGoogle />
          <FaInstagram />
        </div>

        <div className='flex flex-col sm:flex-row gap-4'>
          <p>Privacy Policy</p>
          <p>Terms & Condition</p>
        </div>
      </div>
    </div>
  )
}
export default Footer
