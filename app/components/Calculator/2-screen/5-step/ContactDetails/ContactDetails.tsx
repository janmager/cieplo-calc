import CustomLabel from '@/app/components/Customs/CustomLabel'
import CustomRadioInput from '@/app/components/Customs/CustomRadioInput'
import InputWithPlaceholder from '@/app/components/Customs/InputWithPlaceholder'
import { send_raport_to_email } from '@/app/consts/send_raport_to_email'
import Image from 'next/image'
import React, { use, useEffect, useState } from 'react'
import info from '@/assets/svg/info-icon.svg'
import { send_raport_to_near_companies } from '@/app/consts/send_raport_to_near_companies'
import check from '@/assets/svg/check-orange.svg'
import NextButton from '@/app/components/Customs/NextButton'

function ContactDetails({formData, setFormData, step, setStep}: {formData: any, setFormData: any, step: any, setStep: any}) {
    const [ valid, setValid ] = useState(false)

    useEffect(() => {
        if(
            formData.rules_1 &&
            formData.rules_2 && 
            formData.send_raport_to_email && 
            formData.send_raport_to_near_companies
        ){
            if(
                ((formData.send_raport_to_email.indexOf('Chcę') >= 0 && formData.send_raport_email.indexOf('@') > 0) || formData.send_raport_to_email.indexOf('Chcę') == -1) &&
                ((formData.send_raport_to_near_companies.indexOf('Chcę') >= 0 && formData.contact_email_address && formData.contact_email_address.indexOf('@') > 0 && formData.contact_phone_number && formData.contact_phone_number.length >= 9) || formData.send_raport_to_near_companies.indexOf('Chcę') == -1)
            ){
                setValid(true)
            }
            else setValid(false)
        }
        else{
            setValid(false);
        }
    }, [formData])
    
    return (
        <div className='flex flex-col gap-0 pb-10'>
            <div className="max-w-[1172px] w-full mx-auto mb-0">
                <div className='text-[32px] md:text-[50px] font-[600] max-w-[800px] uppercase leading-[110%]'>Pełny raport</div>
                <div className='text-[20px] md:text-[30px] leading-[36px] font-[400] mt-5 md:mt-10 max-w-[900px]'>Aby wygenerowac pełny raport wypełnij poniższe dane</div>
            </div>
            <div className='flex flex-col w-full md:w-1/2 mt-16'>
                <CustomLabel label='Czy wysłać link do wyniku na maila?' />
                <div className='flex flex-col gap-[14px] mt-[15px] mb-[50px]'>
                    <label>Możesz od razu wysłać link do wyniku np. instalatorowi, szwagrowi albo na twoją własną skrzynkę.</label>
                    {
                        send_raport_to_email.map((item: any, idx: number) => {
                            return (
                                <CustomRadioInput setFormData={setFormData} formData={formData} item={item} name='send_raport_to_email' key={idx} />
                            )
                        })
                    }
                    {
                        formData.send_raport_to_email && formData.send_raport_to_email.indexOf('Chcę') >= 0 && <div className='flex w-full flex-col mt-5 gap-2'>
                            <span>Adres e-mail do wysyłki</span>
                            <InputWithPlaceholder type={'email'} placeholder={''} formDataValue1={'send_raport_email'} formDataValue2={false} setFormData={setFormData} formData={formData} />
                            <div className='flex flex-row gap-5 w-full px-2.5 items-start mt-2.5'>
                                <Image src={info.src} height={22} width={22} className='w-[22px] h-[22px]' alt='alert icon' />
                                <p className='w-full flex-1 mt-[-5px]'>Adres nie będzie przechowywany. Nie dostaniesz od nas nic więcej poza jednorazową wiadomością z linkiem do wyniku.</p>
                            </div>
                        </div>
                    }
                </div>

                <CustomLabel label='Zapytaj firmy z okolicy o oferty' />
                <div className='flex flex-col gap-[14px] mt-[15px] mb-[20px]'>
                    <label>Możemy przesłać twój wynik wraz z zapytaniem o wycenę do wybranej przez ciebie liczby firm z okolicy (max. 10) działających w branży ogrzewania domów i pokrewnych.</label>
                    {
                        send_raport_to_near_companies.map((item: any, idx: number) => {
                            return (
                                <CustomRadioInput setFormData={setFormData} formData={formData} item={item} name='send_raport_to_near_companies' key={idx} />
                            )
                        })
                    }
                    {
                        formData.send_raport_to_near_companies && formData.send_raport_to_near_companies.indexOf('Chcę') >= 0 && 
                        <div className='flex w-full flex-col mt-5 gap-2'>
                            <CustomLabel label='Twoje dane kontaktowe' />
                            <span className='mt-2.5'>Twój telefon kontaktowy</span>
                            <InputWithPlaceholder type={'tel'} placeholder={''} formDataValue1={'contact_phone_number'} formDataValue2={false} setFormData={setFormData} formData={formData} />
                            <div className='flex flex-row gap-5 w-full px-2.5 items-start mt-2.5'>
                                <Image src={info.src} height={22} width={22} className='w-[22px] h-[22px]' alt='alert icon' />
                                <p className='w-full flex-1 mt-[-5px]'>Większość firm preferuje kontakt telefoniczny.</p>
                            </div>
                            <span className='mt-2.5'>Adres e-mail</span>
                            <InputWithPlaceholder type={'email'} placeholder={''} formDataValue1={'contact_email_address'} formDataValue2={false} setFormData={setFormData} formData={formData} />
                            <div className='flex flex-row gap-5 w-full px-2.5 items-start mt-2.5'>
                                <Image src={info.src} height={22} width={22} className='w-[22px] h-[22px]' alt='alert icon' />
                                <p className='w-full flex-1 mt-[-5px]'>Adres przekażemy firmom do kontaktu w sprawie wyceny oraz prześlemy nań potwierdzenie wysłania zapytania.</p>
                            </div>
                        </div>
                    }
                </div>
            </div>

            <div>
                <div onClick={() => setFormData({...formData, rules_1: !formData.rules_1})} className='flex items-center cursor-pointer justify-start flex-row gap-5 mt-5'>
                    <div className='min-h-[20px] max-h-[20px] rounded max-w-[20px] min-w-[20px] flex items-center border justify-center border-[#8296AC]'>
                        {formData.rules_1 && <Image src={check.src} height={15} width={15} alt="check" />}
                    </div>
                    <span>Zgadzam się dobrowolnie na kontakt mailowy i telefoniczny od firm w liczbie w/w, w celu przedstawienia mi ofert dot. w/w zakresu zlecenia. Potwierdzenie tej zgody wraz z listą firm, którym cieplo.app przekazuje moje dane kontaktowe, otrzymam mailowo na podany przeze mnie powyżej adres e-mail. Zapoznawszy się z <a href='https://cieplo.app/prywatnosc' className='underline' target="_blank">Polityką Prywatności Cieplo.app</a>, akceptuję ją.</span>
                </div>
            </div>

            <div>
                <div onClick={() => setFormData({...formData, rules_2: !formData.rules_2})} className='flex items-center cursor-pointer justify-start flex-row gap-5 mt-5'>
                    <div className='min-h-[20px] max-h-[20px] rounded max-w-[20px] min-w-[20px] flex items-center border justify-center border-[#8296AC]'>
                        {formData.rules_2 && <Image src={check.src} height={15} width={15} alt="check" />}
                    </div>
                    <span>Poinformowano mnie, że powyższą zgodę mogę w każdej chwili wycofać i zażądać usunięcia moich danych od tych firm, którym zostały one przekazane, a od których kontaktu już sobie nie życzę. Wystarczy do tego moje oświadczenie w trakcie rozmowy z przedstawicielem danej firmy lub przesłane mailowo na adres kontaktowy firmy, który otrzymuję w mailowym potwierdzeniu wysłania zapytania.</span>
                </div>
            </div>

            <div className='max-w-[1172px] px-5 mt-16 w-full flex mb-5 justify-end mx-auto'>
                <NextButton active={valid} setViewId={setStep} nextView={step+1} />
            </div>
        </div>
    )
}

export default ContactDetails