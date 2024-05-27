import { BsFingerprint } from 'react-icons/bs'
import { GrUserAdmin } from 'react-icons/gr'
import MenuItem from './/MenuItem'
import useRole from '../../../../hooks/useRole'
import { useState } from 'react'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'
import useAuth from '../../../../hooks/useAuth'
import toast from 'react-hot-toast'
import HostRequestModal from '../../../Modal/HostRequestModal'

const GuestMenu = () => {
  const [role] = useRole()
  const axiosSecure = useAxiosSecure()
  const {user} = useAuth()

  const [isModalOpen, setIsModaLOpen] = useState(false);

  const closeModal = () => {
    setIsModaLOpen(false)
  } 

  const modalHandler = async () => {
    console.log('i send a host request');
    try{
      const currentUser = {
        email: user?.email,
        role: 'guest',
        status: 'Requested'
      }
      const {data} = await axiosSecure.put(`/user`, currentUser)
      console.log(data);
      if(data.modifiedCount>0){
        toast.success('Success! Please Wait for admin confirmation')
      }else{
        toast.error('Please Wait for admin approval!')
      }    
    }catch(err){
      toast.error(err.message)
    }finally{
      closeModal()
    }
  }


  return (
    <>
      <MenuItem
        icon={BsFingerprint}
        label='My Bookings'
        address='my-bookings'
      />

      {role === 'guest' &&       <div className='flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer'>
        <GrUserAdmin className='w-5 h-5' />

        <button onClick={() => setIsModaLOpen(true)} className='mx-4 font-medium'>Become A Host</button>
        {/* Modal */}
        <HostRequestModal isOpen={isModalOpen} closeModal={closeModal} modalHandler={modalHandler}/>  
      </div>
       }
    </>
  )
}

export default GuestMenu
