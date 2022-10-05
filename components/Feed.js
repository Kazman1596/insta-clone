import React from 'react';
import MiniProfile from './MiniProfile';
import Posts from './Posts';
import Stories from './Stories';
import Suggestions from './Suggestions';
import {useSession} from 'next-auth/react'

export default function Feed() {
    const {data: session} = useSession()

    return (
        <main className={`grid ${session ? 'grid-cols-1 md:grid-cols-3 mg:max-w-6xl mx-auto' : 'grid-cols-2 md:grid-cols-3 mg:max-w-3xl mx-auto'}`}>
            <section className='md:col-span-2'>
                {/* Stories */}
                <Stories />
                {/* Post */}
                <Posts />
            </section>

            <section className='hidden md:inline-grid'>
                <div className='fixed w-[380px]'>
                    {/* Mini Profile */}
                    <MiniProfile />
                    {/* Suggestions */}
                    <Suggestions />
                </div>
            </section>
        </main>
    );
}
