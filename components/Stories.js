import minifaker from 'minifaker'
import "minifaker/locales/en"
import { useState, useEffect } from 'react';
import Story from './Story';
import {useSession} from 'next-auth/react'

export default function Stories() {
    const [storyUsers, setStoryUsers] = useState([])
    const {data: session} = useSession()

    useEffect(()=>{
        const storyUsers = minifaker.array(20, (i)=> (
            {
                username: minifaker.username({local:"en"}).toLowerCase(),
                img: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`,
                id: i,
            }
        ))
        setStoryUsers(storyUsers)
    }, [])
    return (
        <div className='flex space-x-2 p-6 bg-sky-800 mt-8 border-gray-600 shadow-lg border overflow-x-scroll rounded-sm scrollbar-none'>
            {session && (
                <Story img={session.user.image} username={session.user.username} isUser='true' />
            )}

            {storyUsers.map(user=>(
                <Story key={user.id} username={user.username} img={user.img} />
            ))}
        </div>
    );
}
