'use client'

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

function page() {
    const router = useRouter();

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
            if (event.data && event.data.length > 5) {
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

    return (
        <div>.</div>
    )
}

export default page