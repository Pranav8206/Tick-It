import { useState, useEffect } from 'react';

export default function Navbar() {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setNow(new Date());
        }, 10000);
        return () => clearInterval(timer);
    }, []);

    // Format: Monday
    const day = now.toLocaleDateString('en-US', { weekday: 'long' });

    // Format: 20 Jun
    const date = now.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short'
    });

    // Format: 11:42 AM
    const time = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
  return (
    <div className='sm:hidden px-2 w-[100vw] h-10 flex
    bg-gradient-to-b from-[#8d89ff] to-[#9da1ba]  justify-between 
    items-center text-black '>
      <div >{date}</div>
      <div className='font-bold'>Crush Goals.</div>
      <div >{time}</div>

      
    </div>
  )
}

