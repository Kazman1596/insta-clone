import Image from 'next/image';
import React from 'react';
import { SearchIcon } from '@heroicons/react/outline'

export default function Header() {
    return (
        
        <div className='flex items-center justify-between max-w-6xl'>
            
            {/* Left */}
            <div className='cursor-pointer h-24 w-24 relative hidden lg:inline-grid'>
                <Image 
                    alt='logo'
                    layout='fill'
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png'
                    className='object-contain'
                />
            </div>
            
            <div className='cursor-pointer h-24 w-10 relative sm:inline-grid lg:hidden'>
                <Image 
                    alt='logo'
                    layout='fill'
                    src='https://static.xx.fbcdn.net/assets/?revision=816167972411634&name=desktop-instagram-gradient-logo&density=1'
                    className='object-contain'
                    />
            </div>
            
            {/* Middle */}
            <div className='relative mt-1'>
                <div className='absolute top-2 left-2'>
                    <SearchIcon className='h-5 text-gray-500'/>
                </div>
                <input type='text' placeholder='Search' className='bg-gray-50 pl-10 border-gray-500 text-sm focus:ring-black focus:border-black rounded-md'/>
            </div>

            {/* Right */}
            <h1>Right</h1>
        </div>


    );
}