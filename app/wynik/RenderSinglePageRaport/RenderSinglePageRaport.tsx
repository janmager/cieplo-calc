'use client'

import FullRaportPreview from '@/app/components/Calculator/2-screen/5-step/FullRaportPreview/FullRaportPreview'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function RenderSinglePageRaport({raport}: {raport: any}) {
    const [ formData, setFormData ] = useState(raport)

    const router = useRouter();
    var url = new URL(window.location.href);
    var download = url.searchParams.get("auto_download");

    useEffect(() => {
            // Funkcja obsługująca przychodzące wiadomości
            const handleMessage = (event: any) => {
                // WAŻNE: Sprawdź pochodzenie wiadomości dla bezpieczeństwa!
                // Powinien to być adres URL Twojej strony WordPress.
                const expectedOrigin = process.env.NEXT_PUBLIC_TARGET_PAGE;
                if (event.origin !== expectedOrigin) {
                    console.warn(`Odrzucono wiadomość od nieoczekiwanego źródła: ${event.origin}`);
                    return;
                }
    
                // Sprawdź, czy dane istnieją i nie są puste
                if (event.data && event.data.length > 10) {
                    console.log('Otrzymano ID od WordPress:', event.data);
                    router.push(`/wynik/${event.data}`);
                }
            };
    
            // Dodaj słuchacza
            window.addEventListener('message', handleMessage);
    
            // WAŻNE: Pamiętaj o "posprzątaniu" po komponencie, aby uniknąć wycieków pamięci
            return () => {
                window.removeEventListener('message', handleMessage);
            };
        }, []);

    
          useEffect(() => {
            const sendHeight = () => {
              const height = document.body.scrollHeight;
              window.parent.postMessage({ type: 'setHeight', height }, '*');
            };
        
            sendHeight();
        
            // na wypadek dynamicznych zmian
            const observer = new MutationObserver(sendHeight);
            observer.observe(document.body, { childList: true, subtree: true, attributes: true });
        
            window.addEventListener('resize', sendHeight);
        
            return () => {
              observer.disconnect();
              window.removeEventListener('resize', sendHeight);
            };
          }, []);

    return (
        <div className='px-0 md:px-10 py-24 md:pt-32 md:pb-10 max-w-[1172px] mx-auto'>
            <FullRaportPreview autoDownload={download == 'true' ? true : false} singleView={true} formData={formData} setFormData={setFormData} />
        </div>
    )
}

export default RenderSinglePageRaport