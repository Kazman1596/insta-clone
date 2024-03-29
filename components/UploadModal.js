import { useRecoilState } from 'recoil';
import { modalState } from '../atom/modalAtom';
import Modal from 'react-modal'
import { CameraIcon } from '@heroicons/react/outline';
import { useRef, useState } from 'react';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db, storage } from '../firebase'
import { useSession } from 'next-auth/react';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';


export default function UploadModal() {
    const [open, setOpen] = useRecoilState(modalState)
    const [selectedFile, setSelectedFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const { data: session } = useSession()

    async function uploadPost() {
        if (loading) return;

        setLoading(true)

        const docRef = await addDoc(collection(db, 'posts'), {
            caption: captionRef.current.value,
            username: session.user.username,
            profileImg: session.user.image,
            timestamp: serverTimestamp(),

        })
        const imageRef = ref(storage, `posts/${docRef.id}/image`)
        
        await uploadString(imageRef, selectedFile, 'data_url').then(
            async(snapshot) => {
                const downloadURL = await getDownloadURL(imageRef)
                await updateDoc(doc(db, 'posts', docRef.id), {
                    image: downloadURL,
                })
            }
        )

        setOpen(false)
        setLoading(false)
        setSelectedFile(null)
    }


    function addImageToPost(e){
        const reader = new FileReader();
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0])
        }

        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result)
        }
    }

    const filePickerRef = useRef(null)
    const captionRef = useRef(null)

    return (
        <div>
            {open && (
            <Modal
                className='max-w-lg w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-sky-800 border-2 rounded-md shadow-md focus:ring-0'
                isOpen={open}
                onRequestClose={()=>{
                    setOpen(false)
                    setSelectedFile(null)
                }}
            >
                <div className='flex flex-col justify-center items-center h-[100%]'>
                        {selectedFile ? (
                            <img onClick={()=>setSelectedFile(null)} src={selectedFile} alt='uploaded_image' className=' max-w-[250px] object-fit cursor-pointer' />) : (
                            <CameraIcon onClick={()=>filePickerRef.current.click()} className='cursor-pointer h-14 bg-cyan-800 p-2 rounded-full border-2 border-amber-500 text-amber-500'/>)
                            }
                    <input 
                        type='file' 
                        hidden 
                        ref={filePickerRef} 
                        onChange={addImageToPost}
                    />
                    <input 
                        type='text' 
                        maxLength='150' 
                        placeholder='Enter your caption...' 
                        className='m-4 border-none text-center w-full focus:ring-0'
                        ref={captionRef}
                    />
                    <button 
                        disabled={!selectedFile || loading}
                        onClick={uploadPost}
                        className='w-full bg-amber-500 text-white p-2 shadow-md hover:brightness-125 disabled:bg-gray-300 disabled:cursor-pointer-not-allowed disabled:hover:brightness-100'
                        >
                        Upload
                    </button>
                </div>
            </Modal>
            )}
        </div>
    )
}
