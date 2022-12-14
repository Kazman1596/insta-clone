import Image from 'next/image';
import React from 'react';
import { SearchIcon, PlusCircleIcon } from '@heroicons/react/outline'
import { HomeIcon } from '@heroicons/react/solid'
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { modalState } from '../atom/modalAtom'
import { useRouter } from 'next/router';

export default function Header() {
    const {data: session} = useSession()
    const [open, setOpen] = useRecoilState(modalState)
    const router = useRouter()

    return (

        <div className='shadow-sm border-b sticky top-0 bg-white z-30'>
            <div className='flex items-center justify-between max-w-6xl mx-4 xl:mx-auto'>
            
            {/* Left */}

                <div className='cursor-pointer h-24 w-24 relative hidden lg:inline-grid'>
                    <Image 
                        alt='logo'
                        layout='fill'
                        src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png'
                        className='object-contain'
                        onClick={() => router.push('/')}
                    />
                </div>
                
                <div className='cursor-pointer h-24 w-10 relative sm:inline-grid lg:hidden'>
                    <Image 
                        alt='logo'
                        layout='fill'
                        src='https://static.xx.fbcdn.net/assets/?revision=816167972411634&name=desktop-instagram-gradient-logo&density=1'
                        className='object-contain'
                        onClick={() => router.push('/')}
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

                <div className='flex space-x-4 items-center'>
                    <HomeIcon 
                        onClick={() => router.push('/')} 
                        className='hidden md:inline-flex h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out' 
                    />
                    {session ? (
                        <>
                            <PlusCircleIcon onClick={()=> setOpen(true)} className='h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out' />
                            <img
                                onClick={signOut}
                                className='h-10 object-contain rounded-full cursor-pointer'
                                alt='profile'
                                src='https://pbs.twimg.com/profile_images/664169149002874880/z1fmxo00_400x400.jpg'
                            />
                        </>
                    ) : (
                        <button onClick={signIn}>Sign In</button>
                    )}
                </div>
            </div>
        </div>
        
        


    );
}