import Image from 'next/image';
import React from 'react';

export default function Header() {
    return (
        <div>
            {/* Left */}
            
            <div className='flex items-center justify-between max-w-6xl'>
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
                    <h1>Right</h1>
            </div>
            {/* Middle */}

            {/* Right */}

        </div>
    );
}