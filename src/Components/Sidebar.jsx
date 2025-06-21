import { useState, useEffect } from 'react';
import { GoGoal } from "react-icons/go";


export default function Sidebar() {
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


        <div className='sidebar max-w-[40vw]  hidden sm:block p-4  text-black'>
            <div className='flex justify-between   items-center'>
                <div className='font-bold text-4xl'>Today</div>
                
            </div>
            <div className='flex items-center text-2xl py-3 font-medium text-gray-500'>
                <div>{day}</div>
                <svg className='mx-1 mt-1 h-1 w-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" color="#6b7280" fill="#6b7280">
                    <circle cx="12" cy="12" r="10" stroke="#6b7280" stroke-width="1.5" stroke-linejoin="round"></circle>
                </svg>
                <div >{date}</div>
            </div>
            <div className='text-gray-900 font-bold text-2xl '>{time}</div>

            <div className='addtask w-full cursor-pointer  my-16 md:mx-4  justify-evenly items-center flex bg-white rounded-full  lg:px-4 py-2'>
                <span className='text-2xl font-bold'>Crush Goals</span>
                <span className='text-2xl font-bold'>
                    <GoGoal />
                </span>
            </div>
        </div>
    );
}


