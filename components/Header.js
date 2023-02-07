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

        <div className='shadow-lg border-b sticky top-0 bg-gray-200 z-30'>
            <div className='flex items-center justify-between max-w-6xl mx-4 xl:mx-auto'>
            
            {/* Left */}
                <div className='hidden lg:flex'>

                    <div className='cursor-pointer relative h-20 w-20 hidden lg:inline-grid'>
                        <Image 
                            alt='logo'
                            layout='fill'
                            src='/images/camera_icon.png'
                            className='object-contain'
                            onClick={() => router.push('/')}
                        />
                    </div>
                        <h1 className='font-mont mt-7 ml-2'>Insta-Connect</h1>
                </div>
                
                <div className='cursor-pointer h-20 w-20 relative sm:inline-grid lg:hidden'>
                    <Image 
                        alt='logo'
                        layout='fill'
                        src='/images/camera_icon.png'
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
                            <PlusCircleIcon onClick={()=> setOpen(true)} className='pr-5 h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out' />
                            <Image
                                onClick={signOut}
                                className='h-10 object-contain rounded-full cursor-pointer'
                                alt='profile'
                                src={session?.user.image}
                                height='40'
                                width='40'
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