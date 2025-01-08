import { checkAdminPass } from '@/utils/supabase/checkAdminPass'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'

function AdminLoginContainer() {
    const [ password, setPassword ] = useState('')
    const [ error, setError ] = useState('')
    const [ loading, setLoading ] = useState(false)

    const router = useRouter()

    const passInput: any = useRef(null)

    const logIn = async () => {
        if(loading){
            return false;
        }
        if(password.length < 3){
            setError('Podaj prawidłowe hasło')
            setPassword('')
            passInput.current.focus()
            return false;
        }
        else if(password.length >= 3){
            setLoading(true);
            const login = await checkAdminPass(password);

            if(login.response){
                setCookie('admin', password)
                window.location.reload();
                setError('')
            }
            else{
                setError('Podaj prawidłowe hasło')
                passInput.current.focus()
                setPassword('')
                setLoading(false)
            }
        }
    }

    return (
        <div className='flex flex-col gap-2.5 mt-10 mb-5 max-w-[400px] mx-auto items-center'>
            <span className='mb-7 font-semibold text-xl'>Zaloguj się do panelu administratora</span>
            <label className='font-[400] text-sm text-center text-gray-500'>Wprowadź hasło dostępu</label>
            <div className='border h-[60px] flex w-full flex-row border-[#CDCDCD]'>
                <input onKeyDown={(e) => e.key === 'Enter' && logIn()} ref={passInput} className='text-[26px] px-2 font-bold tracking-widest text-center w-full h-full outline-none' placeholder='• • • • •' type={'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div onClick={logIn} className={`uppercase w-full font-[700] mt-2.5 h-[60px] flex items-center justify-center px-6 border border-[#FF4510] bg-[#FF4510] hover:bg-black hover:border-black text-white cursor-pointer transition-all duration-200 ${loading ? 'opacity-30' : ''}`}>
                <span>{loading ? 'Trwa logowanie...' : 'Zaloguj się'}</span>
            </div>
            {
                error &&
                <span className='mt-5 text-red-600 font-semibold text-sm text-center'>{error}</span>
            }
        </div>
    )
}

export default AdminLoginContainer