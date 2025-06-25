import React from 'react'

function TooMuchkWInfo() {
  return (
    <div className='flex flex-col gap-3 w-full lg:col-span-3'>
        <b>Zapotrzebowanie cieplne Twojego budynku przekracza zakres pojedynczej pompy ciepła – to typowe dla większych obiektów.</b>

        <p>W takich przypadkach rekomendujemy zastosowanie <b>systemu kaskadowego</b> z naszym <a href="https://gree.pl/produkt/sterownik-kaskadowy-versati/" target="_blank" className='underline'>autorskim sterownikiem pracy kaskadowej</a>.</p>
    
        <p>Rozwiązanie to umożliwia precyzyjne sterowanie pracą wielu pomp ciepła, zapewniając:</p>

        <ul className='flex flex-col gap-2 w-full'>
            <ol>- elastyczną pracę i dopasowanie do dużych mocy,</ol>
            <ol>- wyższą efektywność energetyczną dzięki lepszej modulacji pracy urządzeń,</ol>
            <ol>- większe bezpieczeństwo i niezawodność systemu.</ol>
        </ul>

        <p className='mt-5'><b>Twój budynek ma duże potrzeby? Mamy gotowe rozwiązanie.</b> Skontaktuj się z nami – pomożemy dobrać optymalną konfigurację.</p>
    </div>
  )
}

export default TooMuchkWInfo