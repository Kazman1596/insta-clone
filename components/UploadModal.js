import { useRecoilState } from 'recoil';
import { modalState } from '../atom/modalAtom';
import Modal from 'react-modal'
import { CameraIcon } from '@heroicons/react/outline';
import { useRef, useState } from 'react';


export default function UploadModal() {
    const [open, setOpen] = useRecoilState(modalState)
    const [selectedFile, setSelectedFile] = useState(null)

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

    return (
        <div>
            {open && (
            <Modal
                className='max-w-lg w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-md focus:ring-0'
                isOpen={open}
                onRequestClose={()=>{
                    setOpen(false)
                    setSelectedFile(null)
                }}
            >
                <div className='flex flex-col justify-center items-center h-[100%]'>
                        {selectedFile ? (
                            <img onClick={()=>setSelectedFile(null)} src={selectedFile} alt='uploaded_image' className='w-full max-h-[250px] object-cover cursor-pointer' />) : (
                            <CameraIcon onClick={()=>filePickerRef.current.click()} className='cursor-pointer h-14 bg-red-200 p-2 rounded-full border-2 text-red-500'/>)
                            }
                    <input type='file' hidden ref={filePickerRef} onChange={addImageToPost}/>
                    <input type='text' maxLength='150' placeholder='Enter your caption...' className='m-4 border-none text-center w-full focus:ring-0' />
                    <button disabled className='w-full bg-red-600 text-white p-2 shadow-md hover:brightness-125 disabled:bg-gray-200 disabled:cursor-pointer-not-allowed disabled:hover:brightness-100'>Upload</button>
                </div>
            </Modal>
            )}
        </div>
    )
}
