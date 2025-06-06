'use client'

import React, { useEffect, useRef } from 'react'
import CalculatorContainer from '../components/Calculator/CalculatorContainer'

function page() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Upewnij się, że kod wykonuje się tylko w przeglądarce
    if (typeof window === 'undefined' || !ref.current) {
      return;
    }

    const element = ref.current;

    // Funkcja wysyłająca wiadomość do rodzica (WordPress)
    const postHeight = () => {
      const height = element.scrollHeight;
      // WAŻNE: Podaj tutaj domenę swojej strony WordPress dla bezpieczeństwa!
      window.parent.postMessage({ frameHeight: height }, 'https://gree.ivn-works.com/');
    };

    // Utwórz obserwatora, który będzie reagował na zmiany rozmiaru
    const resizeObserver = new ResizeObserver(() => {
      postHeight();
    });

    // Zacznij obserwować element
    resizeObserver.observe(element);

    // Wyślij wysokość zaraz po załadowaniu
    postHeight();

    // Funkcja czyszcząca: przestań obserwować, gdy komponent zostanie odmontowany
    return () => {
      resizeObserver.disconnect();
    };

  }, []); // Pusta tablica zależności sprawia, że useEffect uruchomi się raz po zamontowaniu

  return (
    <div>
      <CalculatorContainer />
    </div>
  )
}

export default page