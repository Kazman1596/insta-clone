import minifaker from 'minifaker'
import { useEffect, useState } from 'react'

export default function Suggestions() {
    const [suggestions, setSuggestions] = useState([])

    
    useEffect(()=>{
        const suggestions = minifaker.array(5, (i)=> (
            {
                username: minifaker.username({locale: "en"}).toLowerCase(),
                jobTitle: minifaker.jobTitle(),
                id: i
                
            }
            ))
            setSuggestions(suggestions)
        }, [])
        
        return (
        <div className="mt-4 ml-10">
            <div className="flex justify-between mb-5 text-sm">
                <h3 className="font-bold text-gray-700">Suggestion for you</h3>
                <button className="text-gray-600 font-semibold">See All</button>
            </div>
            {suggestions.map(suggestion =>(
                <div key={suggestion.id} className='flex items-center mt-3'>
                    <img className='h-10 rounded-full border p-[2px]' src={`https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`} alt='profile img'/>
                    <div className='flex-1 ml-4'>
                        <h2 className='font-semibold text-sm'>{suggestion.username}</h2>
                        <h3 className='hidden xl:flex text-sm text-gray-700'>{suggestion.jobTitle}</h3>
                    </div>
                    <button className='font-semibold text-blue-800 text-sm ml-5'>Follow</button>
                </div>
            ))}
        </div>
    )
}