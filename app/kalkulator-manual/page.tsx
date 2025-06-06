'use client'

import React, { useEffect, useRef } from 'react'
import CalculatorContainer from '../components/Calculator/CalculatorContainer'
import Admin from '../admin/page';
import ManualCalc from '../test/page';

function page() {
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
    <div className='px-5 max-w-[1400px] mx-auto'>
      <ManualCalc />
    </div>
  )
}

export default page