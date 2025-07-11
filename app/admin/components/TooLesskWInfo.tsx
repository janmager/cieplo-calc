import React from 'react'

function TooLesskWInfo() {
  return (
    <div className='flex flex-col gap-3 leading-[160%] w-full lg:col-span-3'>

        <p>Zapotrzebowanie cieplne Twojego budynku okazało się wyjątkowo niskie – to bardzo dobra wiadomość i znak, że obiekt jest <b>świetnie zaizolowany</b>.</p>
    
        <p>W naszej ofercie pomp ciepła powietrze/woda nie posiadamy urządzeń o tak niskiej mocy. W takich przypadkach rekomendujemy zastosowanie <b>pompy ciepła powietrze–powietrze</b>, dla których dostępna jest <b>szeroka gama modeli</b> idealnie dopasowanych do Twoich potrzeb.</p>

        <p>Rozwiązanie to zapewnia:</p>
        <ul className='flex flex-col gap-2 w-full'>
            <ol className='font-bold'>- prostą instalację i szybki montaż,</ol>
            <ol>- <b>wysoką efektywność</b> nawet przy małym zapotrzebowaniu,</ol>
            <ol>- <b>komfort cieplny latem i zimą</b> (funkcja chłodzenia i grzania),</ol>
            <ol>- <b>korzystną cenę i niskie koszty eksploatacji.</b></ol>
        </ul>

        <p className='mt-5'>Twój budynek potrzebuje niewiele energii, ale nadal zasługuje na komfortowe rozwiązanie.<br/>
        <b>Skontaktuj się z nami – pomożemy dobrać idealne urządzenie.</b></p>
    </div>
  )
}

export default TooLesskWInfo