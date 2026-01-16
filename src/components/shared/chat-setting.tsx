import { ArrowUpLeftFromSquareIcon, Edit2, Loader2, Moon } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useNavigate } from "react-router-dom"


interface Props {
    settingOpenModal: boolean,
    setSettingOpenModal: (v: boolean) => void
}
const ChatSetting = ({settingOpenModal, setSettingOpenModal}: Props) => {

     const {updateProfile, user, profileLoading, logout}  = useAuth()
     const settingModalRef = useRef<HTMLInputElement | null>(null)
     const [avatar, setAvatar] = useState<string | null>(null)
     const userProfileRef = useRef<HTMLInputElement | null>(null)
     const navigate = useNavigate()


     useEffect(() => {
         const handleClickOutside = (e: MouseEvent) => {
           if (settingModalRef.current && !settingModalRef.current.contains(e.target as Node)) {
             setSettingOpenModal(false);
           }
         };
         document.addEventListener("mousedown", handleClickOutside);
         return () => document.removeEventListener("mousedown", handleClickOutside);
       }, [settingOpenModal]);


              
            const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files?.[0]
       
                if(!file) return
                if(!file.type.startsWith('image/')) {
                    toast.error("Please select an image file")
                    return
                }
       
                const reader = new FileReader()
                reader.onloadend = () => setAvatar(reader.result as string)
                reader.readAsDataURL(file)
            }
       
                 const handleUpdateUserProfile = () => {
            
                    if(!avatar) {
                         toast.error('Please select an image')
                         return
                    }
            
                    updateProfile({
                      avatar,
                    })
            
                 }

                 const handleLogout = () => {
                     logout()
                     navigate("/");
                     toast.success("Logout Successfully!");
                 }

  return (
    <>
    {
            settingOpenModal ? (
              <div className='bg-[#F9FBFC] max-w-[300px] w-full h-[32.9rem] shadow-sm rounded-r-md absolute bottom-2 border py-8 px-5 flex flex-col justify-between z-20' ref={settingModalRef}>

                <div className='h-full flex flex-col gap-5'>
                   
                <div className="flex items-center gap-4">
                   <div className='w-20 h-20 z-20 rounded-full relative'>
             <img src={avatar
      ? avatar
      : user?.avatar
        ? user.avatar
        : '/image/blank.png'} className="h-full w-full rounded-full ring-2 ring-[#8E8AD8] object-cover"/>
              <input type="file" className="hidden" ref={userProfileRef} accept="/image/*" onChange={handleImageChange}/>

                <button  className='p-1 rounded-md absolute left-12 top-12 z-20'>
                    <Edit2 className='size-7 text-white cursor-pointer z-20 bg-gray-400 hover:bg-slate-200 p-1 rounded-sm hover:rounded-full transition-hover hover:text-[#8B92A1]' onClick={() => userProfileRef.current?.click()}/>
                </button>
                   </div>
              <h2 className='text-2xl font-semibold font-sans text-[#868b96] truncate'>{user?.name}</h2>
                </div>
              

                 <div className='flex flex-col mt-5'>
                   <h2 className='text-2xl font-semibold font-sans'>Theme</h2>
                   <p className='text-[0.9rem] text-gray-400 mt-1'>App color theme</p>

                    <div className='w-44 h-10 border mt-3 p-2 flex rounded-sm justify-between items-center cursor-pointer'>
                        <p className='flex gap-2 items-center'><Moon className='text-[#495568] size-5'/> <span className='text-[#495568]'>Dark</span></p>
                        <ArrowUpLeftFromSquareIcon className='text-[#495568] size-4'/>
                    </div>
                 </div>
                </div>

                 <button className='w-full h-12 rounded-sm border mb-3 flex items-center justify-center shadow-sm cursor-pointer' onClick={handleLogout}>
                        <p className='text-[1rem] text-destructive font-medium'>Logout</p>
                 </button>
              <button className={`w-full py-2  text-white rounded-sm flex justify-center items-center  ${profileLoading ? 'bg-purple-500 cursor-not-allowed' : 'bg-purple-600 cursor-pointer'}`} onClick={handleUpdateUserProfile}>
                  {profileLoading
                  ? <div className='flex gap-2 items-center'>
                      <Loader2 className='animate-spin text-white size-5'/>
                      <p className='text-[1rem] text-white'>Saving...</p>
                  </div> : <p className='text-[1rem] text-white font-semibold'>Save Changes</p>}
                </button>
              </div>
            ): ''
           }
    </>
  )
}

export default ChatSetting