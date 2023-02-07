import { PlusIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import React from 'react';

export default function Story({img, username, isUser}) {
    return (
        <div className='relative group cursor-pointer'>
            <Image className='h-14 rounded-full scale-95 p-[1.5px] border-2 border-amber-500 group-hover:scale-100 cursor-pointer transition-transform duration-200 ease-out' height='50' width='50' src={img} alt={username} />
            {isUser && <PlusIcon className='h-6 absolute top-4 left-4 text-white' />}
            <p className='text-xs text-gray-100 w-14 truncate'>{username}</p>
        </div>
    )
}
