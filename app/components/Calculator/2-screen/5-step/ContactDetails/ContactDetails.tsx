import CustomLabel from '@/app/components/Customs/CustomLabel'
import CustomRadioInput from '@/app/components/Customs/CustomRadioInput'
import InputWithPlaceholder from '@/app/components/Customs/InputWithPlaceholder'
import { send_raport_to_email } from '@/app/consts/send_raport_to_email'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import info from '@/assets/svg/info-icon.svg'
import { send_raport_to_near_companies } from '@/app/consts/send_raport_to_near_companies'
import check from '@/assets/svg/check-orange.svg'
import NextButton from '@/app/components/Customs/NextButton'
import { send_raport_accept_24h } from '@/app/consts/send_raport_accept_24h'
import PrevButton from '@/app/components/Customs/PrevButton'

function ContactDetails({formData, setFormData, step, setStep, errors, setErrors, loadingUpper}: {formData: any, setFormData: any, step: any, setStep: any, errors: any, setErrors: any, loadingUpper: boolean}) {
    const validateContact = () => {
        let valid = true;

        if(!formData.send_raport_to_email){
            valid = false;
            setErrors({...errors, 'send_raport_to_email' : true});
            return false;
        }
        if(formData.send_raport_to_email.indexOf('Chcę') >=0 && (formData.contact_email_address == '' || formData.contact_email_address.indexOf('@') < 0)){
            valid = false;
            setErrors({...errors, 'contact_email_address' : {msg: 'Podaj prawidłowy adres email'}});
            return false;
        }
        if(!formData.send_raport_to_near_companies){
            valid = false;
            setErrors({...errors, 'send_raport_to_near_companies' : true});
            return false;
        }
        if(formData.send_raport_to_near_companies.indexOf('Chcę') >=0 && (formData.contact_phone_number == '' || formData.contact_phone_number.length < 9)){
            valid = false;
            setErrors({...errors, 'contact_phone_number' : {msg: 'Podaj prawidłowy numer telefonu'}});
            return false;
        }
        if(formData.send_raport_to_near_companies.indexOf('Chcę') >=0 && (formData.contact_email_address == '' || formData.contact_email_address.indexOf('@') < 0)){
            valid = false;
            setErrors({...errors, 'contact_email_address' : {msg: 'Podaj prawidłowy adres email'}});
            return false;
        }
        if(!formData.send_raport_accept_24h){
            valid = false;
            setErrors({...errors, 'send_raport_accept_24h' : true});
            return false;
        }

        // rules under checking
        if(!formData.rule_privacy_policy){
            valid = false;
            setErrors({...errors, 'rule_privacy_policy' : true});
            return false;
        }
        if(formData.send_raport_to_email.indexOf('Chcę') >= 0 && !formData.rule_mail_raport){
            valid = false;
            setErrors({...errors, 'rule_mail_raport' : true});
            return false;
        }
        if(formData.send_raport_to_near_companies.indexOf('Chcę') >= 0 && !formData.rule_other_company_contact){
            valid = false;
            setErrors({...errors, 'rule_other_company_contact' : true});
            return false;
        }
        if(formData.send_raport_accept_24h.indexOf('Tak') >= 0 && !formData.rule_expert_gree){
            valid = false;
            setErrors({...errors, 'rule_expert_gree' : true});
            return false;
        }

        if(valid){
            setStep(step+1)
            window.scrollTo(0, 0);
            if (window.self !== window.top) {
                const message = { type: 'scrollToTop' };
                const targetOrigin: string = process.env.NEXT_PUBLIC_TARGET_PAGE as string; 
                window.parent.postMessage(message, targetOrigin);
            }
        }
    }
    
    return (
        <div className='flex flex-col gap-0 pb-10'>
            <div className="max-w-[1172px] w-full mx-auto mb-0">
                <div className='text-[32px] md:text-[50px] font-[600] max-w-[800px] uppercase leading-[110%]'>Raport doboru mocy pompy ciepła GREE</div>
                <div className='text-[20px] md:text-[24px] leading-[36px] font-[400] mt-5 md:mt-10 max-w-[900px]'>Już za chwilę otrzymasz podsumowanie Twojego doboru wraz z wykazem urządzeń, które rekomendujemy do budynku na podstawie podanych przez Ciebie informacji.<br/><br/>Daj nam znać, co chcesz zrobić z wynikiem:</div>
            </div>
            <div className='flex flex-col w-full lg:w-4/5 mt-8'>
                <CustomLabel label='Chcę dostać swój wynik na maila' />
                <div className='flex flex-col gap-[14px] mt-[15px] mb-[30px]'>
                    <label>Podaj nam swój adres e-mail, a wyślemy Ci link do Twojej kalkulacji doboru, który będziesz mógł skonsultować z fachowcem wykonującym instalację w Twoim budynku.</label>
                    {
                        send_raport_to_email.map((item: any, idx: number) => {
                            return (
                                <CustomRadioInput errors={errors} setErrors={setErrors} setFormData={setFormData} formData={formData} item={item} name='send_raport_to_email' key={idx} />
                            )
                        })
                    }
                </div>

                <CustomLabel label='Chcę otrzymać ofertę na dobrane wstępnie pompy ciepła GREE' />
                <div className='flex flex-col gap-[14px] mt-[15px] mb-[20px]'>
                    <label>Prześlemy Twój wynik do Autoryzowanego Instalatora Gree z Twojej okolicy, a on skontaktuje się z Tobą i przygotuje ofertę na wskazane w kalkulatorze produkty wraz z usługą montażu.</label>
                    {
                        send_raport_to_near_companies.map((item: any, idx: number) => {
                            return (
                                <CustomRadioInput errors={errors} setErrors={setErrors} setFormData={setFormData} formData={formData} item={item} name='send_raport_to_near_companies' key={idx} />
                            )
                        })
                    }
                </div>

                <CustomLabel label='Chcę porozmawiać z ekspertem Gree - skontaktuje się z Tobą w ciągu 24h (w przypadku weekendu w najbliższym dniu roboczym).' />
                <div className='flex flex-col gap-[14px] mt-[15px] mb-[20px]'>
                    <label>Nie masz pewności, który typ pompy będzie dla Ciebie najlepszy? Chcesz zadać dodatkowe pytania? Zostaw nam swoje dane, a nasz doradca techniczny skontaktuje się z Tobą w ciągu 24 h.</label>
                    {
                        send_raport_accept_24h.map((item: any, idx: number) => {
                            return (
                                <CustomRadioInput errors={errors} setErrors={setErrors} setFormData={setFormData} formData={formData} item={item} name='send_raport_accept_24h' key={idx} />
                            )
                        })
                    }
                </div>

                {((formData.send_raport_accept_24h && formData.send_raport_accept_24h.indexOf('Tak') >= 0) || (formData.send_raport_to_email && formData.send_raport_to_email.indexOf('Chcę') >= 0) || (formData.send_raport_to_near_companies && formData.send_raport_to_near_companies.indexOf('Chcę') >= 0)) && 
                <div className='mb-[20px] grid grid-cols-1 mt-5 md:grid-cols-2 gap-5'>
                    <div className='md:col-span-2'>    
                        <CustomLabel label='Twoje dane kontaktowe' />
                    </div> 
                    {((formData.send_raport_accept_24h && formData.send_raport_accept_24h.indexOf('Tak') >= 0) || (formData.send_raport_to_email && formData.send_raport_to_email.indexOf('Chcę') >= 0) || (formData.send_raport_to_near_companies && formData.send_raport_to_near_companies.indexOf('Chcę') >= 0)) && <div className='flex w-full flex-col gap-2'>
                        <span className=''>Adres e-mail</span>
                        <InputWithPlaceholder errors={errors} setErrors={setErrors} type={'email'} placeholder={''} formDataValue1={'contact_email_address'} formDataValue2={false} setFormData={setFormData} formData={formData} />
                    </div>}     
                    {((formData.send_raport_accept_24h && formData.send_raport_accept_24h.indexOf('Tak') >= 0) || (formData.send_raport_to_near_companies && formData.send_raport_to_near_companies.indexOf('Chcę') >= 0)) && <div className='flex w-full flex-col gap-2'>
                        <span className=''>Twój telefon kontaktowy</span>
                        <InputWithPlaceholder errors={errors} setErrors={setErrors} type={'tel'} placeholder={''} formDataValue1={'contact_phone_number'} formDataValue2={false} setFormData={setFormData} formData={formData} />
                    </div>}
                </div>}
            </div>

            <div>
                <div onClick={() => {setFormData({...formData, rule_privacy_policy: !formData.rule_privacy_policy});if(!formData.rule_privacy_policy) {let old = errors; delete old['rule_privacy_policy'];setErrors(old);}}} className='flex items-center cursor-pointer justify-start flex-row gap-5 mt-5'>
                    <div className='min-h-[20px] max-h-[20px] rounded max-w-[20px] min-w-[20px] flex items-center border justify-center border-[#8296AC]'>
                        {formData.rule_privacy_policy && <Image src={check.src} height={15} width={15} alt="check" />}
                    </div>
                    <span className={`${errors['rule_privacy_policy'] ? 'text-red-600' : ''}`}>Zapoznałem/-am się i akceptuję <a href="https://gree.pl/polityka-prywatnosci/" target='_blank' className='underline'>Politykę Prywatności</a> Free Polska Sp. z.o.o.</span>
                </div>

                {formData.send_raport_to_email.indexOf('Chcę') >= 0 && <div onClick={() => {setFormData({...formData, rule_mail_raport: !formData.rule_mail_raport});if(!formData.rule_mail_raport) {let old = errors; delete old['rule_mail_raport'];setErrors(old);}}} className='flex items-center cursor-pointer justify-start flex-row gap-5 mt-5'>
                    <div className='min-h-[20px] max-h-[20px] rounded max-w-[20px] min-w-[20px] flex items-center border justify-center border-[#8296AC]'>
                        {formData.rule_mail_raport && <Image src={check.src} height={15} width={15} alt="check" />}
                    </div>
                    <span className={`${errors['rule_mail_raport'] ? 'text-red-600' : ''}`}>
                        Wyrażam zgodę na przetwarzanie moich danych osobowych w postaci adresu e-mail w celu wysłania raportu doboru mocy pompy ciepła Gree. Zgoda obejmuje przetwarzanie danych osobowych w wewnętrznych systemach FREE POLSKA Sp. z o.o. Wiem, że zgodę tą mogę w każdej chwili wycofać.
                    </span>
                </div>}

                {formData.send_raport_to_near_companies.indexOf('Chcę') >= 0 && <div onClick={() => {setFormData({...formData, rule_other_company_contact: !formData.rule_other_company_contact});if(!formData.rule_other_company_contact) {let old = errors; delete old['rule_other_company_contact'];setErrors(old);}}} className='flex items-center cursor-pointer justify-start flex-row gap-5 mt-5'>
                    <div className='min-h-[20px] max-h-[20px] rounded max-w-[20px] min-w-[20px] flex items-center border justify-center border-[#8296AC]'>
                        {formData.rule_other_company_contact && <Image src={check.src} height={15} width={15} alt="check" />}
                    </div>
                    <span className={`${errors['rule_other_company_contact'] ? 'text-red-600' : ''}`}>
                        Zgadzam się na jednorazowe przekazanie mojego adresu e-mail oraz numeru telefonu do trzech autoryzowanych firm świadczących usługi montażu produktów Gree oraz zgadzam się na kontakt mailowy i telefoniczny od tych firm, w celu przedstawienia mi ofert dot. w/w zakresu zlecenia. Potwierdzenie tej zgody wraz z listą firm, którym FREE Polska przekazuje moje dane kontaktowe, otrzymam na podany przeze mnie powyżej adres e-mail.
                    </span>
                </div>}

                {formData.send_raport_accept_24h.indexOf('Tak') >= 0 && <div onClick={() => {setFormData({...formData, rule_expert_gree: !formData.rule_expert_gree});if(!formData.rule_expert_gree) {let old = errors; delete old['rule_expert_gree'];setErrors(old);}}} className='flex items-center cursor-pointer justify-start flex-row gap-5 mt-5'>
                    <div className='min-h-[20px] max-h-[20px] rounded max-w-[20px] min-w-[20px] flex items-center border justify-center border-[#8296AC]'>
                        {formData.rule_expert_gree && <Image src={check.src} height={15} width={15} alt="check" />}
                    </div>
                    <span className={`${errors['rule_expert_gree'] ? 'text-red-600' : ''}`}>
                        Wyrażam zgodę na przetwarzanie moich danych osobowych w postaci adresu e-mail i numeru telefonu w celach i zakresie zgodnymi z realizacją odpowiedzi na zadane zapytanie. Zgoda obejmuje przetwarzanie danych osobowych w wewnętrznych systemach FREE POLSKA Sp. z o.o. Wiem, że zgodę tą mogę w każdej chwili wycofać.
                    </span>
                </div>}
            </div>

            <div className='max-w-[1172px] px-5 mt-16 w-full flex mb-5 justify-between mx-auto'>
                <PrevButton onClick={() => setStep(step-1)} />
                <NextButton onClick={validateContact} />
            </div>
        </div>
    )
}

export default ContactDetails