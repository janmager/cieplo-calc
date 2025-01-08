import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation';
import React from 'react'

function AdminContainer() {
    const router = useRouter()
    
    const logOut = () => {
        deleteCookie('admin');
        window.location.reload();
    }

    return (
        <div className='w-full mb-[-50px]'>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-5 w-full'>
                <div className='flex flex-col gap-5'>
                    <span className='text-lg font-bold'>Panel administratora</span>

                    <div>
                        items<br/>
                        items<br/>
                        items<br/>
                        items<br/>
                        items<br/>
                    </div>
                </div>
                <div className='md:col-span-3 border rounded'>
                    content
                </div>
            </div>
            <div className='flex items-center mt-20 justify-center'>
                <span className='opacity-75 hover:opacity-100 transition-all duration-300 cursor-pointer hover:underline font-[400]' onClick={() => logOut()}>Wyloguj</span>
            </div>
        </div>
    ) 
}

export default AdminContainer