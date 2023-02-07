import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { DotsHorizontalIcon, HeartIcon, ChatIcon, BookmarkIcon, EmojiHappyIcon } from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { useSession } from 'next-auth/react'
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import Image from "next/image";

export default function Post({img, userImg, caption, username, id}) {
    const {data: session} = useSession()
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])
    const [likes, setLikes] = useState([])
    const [hasLiked, setHasLiked] = useState(false)

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(db, 'posts', id, 'comments'), orderBy('timestamp', 'desc')), (snapshot) => {setComments(snapshot.docs)}
        )
    }, [db, id])

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, 'posts', id, 'likes'),
            (snapshot) => setLikes(snapshot.docs)
        )

    }, [db])

    useEffect(() => {
        setHasLiked(
            likes.findIndex((like) =>like.id === session?.user.uid) !== -1
        )
    }, [likes])

    async function likePost() {
        if(hasLiked){
            await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid))
        } else {
            await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
                username: session.user.username,
            })
        }


        // setDoc is used instead of addDoc because you can update the like (either like or unlike) //
    }

    async function sendComment(e) {
        e.preventDefault()
        const commentToSend = comment
        setComment('')
        await addDoc(collection(db, 'posts', id, 'comments'), {
            comment: commentToSend,
            username: session.user.username,
            userImage: session.user.image,
            timestamp: serverTimestamp(),
        })
    }
    
    return (
        <div className="bg-gray-200 my-7 border border-cyan-800 rounded-md max-w-2xl xl:ml-[20%]">
            {/* Post Header */}

            <div className="flex items-center p-5">
                <Image
                    className="h-12 rounded-full object-cover border p-1" 
                    src={userImg} 
                    alt={username} 
                    height='40'
                    width='40'
                />
                <p className="font-bold flex-1 ml-3">{username}</p>
                <DotsHorizontalIcon className="h-5" />
            </div>

            {/* Post Image */}

            <img className="object-cover w-full" src={img} alt={id} />

            {/* Post Buttons */}

            {session && (

                <div className="flex justify-between px-4 pt-4">
                    <div className="flex space-x-4">
                        {hasLiked ? (
                            <HeartIconFilled onClick={likePost} className="text-red-400 btn" />
                        ) : (
                            <HeartIcon onClick={likePost} className="btn" />
                        )}
                        <ChatIcon className="btn" />
                    </div>
                    <BookmarkIcon className="btn" />
                </div>

            )}

                {/* Post Comments */}

                <div className="p-5 truncate">
                    {likes.length > 0 && (
                    <p className="font-bold mb-1">{likes.length} likes</p>
                    )}
                    <span className="font-bold mr-2">{username}</span>
                    {caption}
                </div>
                {comments.length > 0 && (
                    <div className="mx-10 max-h-24 overflow-y-scroll scrollbar-none">
                        {comments.map(comment =>(
                            <div key={comment.data().id} className='flex items-center space-x-2 mb-2'>
                                <Image className="h-7 rounded-full object-cover" src={comment.data().userImage} height='30' width='30' alt='user_image'/>
                                <p className="font-semibold">{comment.data().username}</p>
                                <p className="flex-1 truncate">{comment.data().comment}</p>
                                <Moment className="text-sm" fromNow>{comment.data().timestamp?.toDate()}</Moment>
                            </div>
                        ))}
                    </div>
                )}

                {/* Post Input Box */}

                {session && (

                    <form className="flex items-center p-4">
                        <EmojiHappyIcon className="mr-2 h-7" />
                        <input 
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="border-none flex-1 focus:ring-0" 
                            type='text' 
                            placeholder='Enter your comment...' 
                        />
                        <button 
                            type="submit"
                            disabled={!comment.trim()} 
                            className="ml-2 text-amber-500 font-bold disabled:text-sky-200"
                            onClick={sendComment}
                        >
                            Post
                        </button>
                    </form>
                
                )}

        </div>
    )
}