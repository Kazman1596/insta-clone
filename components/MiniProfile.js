import { useSession, signOut } from "next-auth/react"
import Image from "next/image"

export default function MiniProfile() {
    const {data: session} = useSession()

    return (
        <div>
            {session &&
                <div className="xl:flex items-center justify-between mt-14 ml-10">
                    <div className="flex justify-center">
                        <Image className="h-16 rounded-full border p-[2px]" height='50' width='50' src={session?.user.image} alt="user-image" />
                    </div>
                    <div className="flex-1 ml-4">
                        <h2 className="font-bold">{session?.user.username}</h2>
                        <h3 className="text-sm text-gray-400">Welcome to Instagram</h3>
                    </div>
                    <div className="flex justify-center">
                        <button onClick={signOut} className="font-semibold text-blue-800 text-sm">Sign Out</button>
                    </div>
                </div>
            }
        </div>
    )
}