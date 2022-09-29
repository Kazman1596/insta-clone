export default function MiniProfile() {
    return (
        <div className="flex items-center justify-between mt-14 ml-10">
            <img className="h-16 rounded-full border p-[2px]" src="https://pbs.twimg.com/profile_images/664169149002874880/z1fmxo00_400x400.jpg" alt="user-image" />
            <div className="flex-1 ml-4">
                <h2 className="font-bold">zoeissick</h2>
                <h3 className="text-sm text-gray-400">Welcome to Instagram</h3>
            </div>
            <button className="font-semibold text-blue-400 text-sm">Sign Out</button>
        </div>
    )
}