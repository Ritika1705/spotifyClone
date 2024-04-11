import { ChevronDownIcon, PlayIcon } from "@heroicons/react/24/solid";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";

const HomePage = ({setview, setglobalPlaylistId}) => {
    const {data: session} = useSession();
    const [partyData, setPartyData] = useState(null)
    const [happy, setHappyData] = useState(null)
    const [sleepData, setSleepData] = useState(null)
    const [workoutData, setWorkOutData] = useState(null)
    const [roadtripData, setRoadTripData] = useState(null)
    const [inputValue, setinputValue] = useState('')

    function showplaylist(playlist){
        setview("playlist")
            console.log(playlist.id)
        setglobalPlaylistId(playlist.id)
    }

    async function setpartyplaylist(){

        const response = await fetch("https://api.spotify.com/v1/browse/categories/party/playlists", {
            headers : {
                Authorization : `Bearer ${session.accessToken}`
            }
        })
        const data = await response.json()
        return data?.playlists.items
    }


    async function sethappyist(){

        const response = await fetch("https://api.spotify.com/v1/browse/categories/chill/playlists", {
            headers : {
                Authorization : `Bearer ${session.accessToken}`
            }
        })
        const data = await response.json()
        return data?.playlists.items
    }

    async function setsleepplaylist(){

        const response = await fetch("https://api.spotify.com/v1/browse/categories/sleep/playlists", {
            headers : {
                Authorization : `Bearer ${session.accessToken}`
            }
        })
        const data = await response.json()
        return data?.playlists.items
    }

    async function setworkoutplaylist(){

        const response = await fetch("https://api.spotify.com/v1/browse/categories/workout/playlists", {
            headers : {
                Authorization : `Bearer ${session.accessToken}`
            }
        })
        const data = await response.json()
        return data?.playlists.items
    }

    async function setroadtripplaylist(){

        const response = await fetch("https://api.spotify.com/v1/browse/categories/travel/playlists", {
            headers : {
                Authorization : `Bearer ${session.accessToken}`
            }
        })
        const data = await response.json()
        return data?.playlists.items
    }

    useEffect(() => {

        async function f() {
            if(session && session.accessToken){
                setPartyData(await setpartyplaylist())
                setRoadTripData(await setroadtripplaylist())
                setSleepData(await setsleepplaylist())
                setWorkOutData(await setworkoutplaylist())
                setHappyData(await sethappyist())
            }
        }

        f()
    },[session])

    return (
        <div className="flex-grow h-screen">
            <div onClick={()=> signOut()} className="absolute z-20 top-5 right-8 flex items-center bg-black bg-opacity-70 text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
                <img className="rounded-full w-7 h-7" src={session?.user?.image} alt="profile"></img>
                <p className="text-sm">Logout</p>
                <ChevronDownIcon className="h-5 w-5"/>
            </div>
            <div className="flex flex-col gap-4 px-8 h-screen overflow-y-scroll mb-12">
                <div>
                    <h2 className="text-xl font-bold text-white mb-5">Party Hits</h2>
                    <div className="flex flex-wrap gap-6 mb-12" >
                        {
                            partyData?.slice(0,5).map((item)=>{
                                return <div onClick={()=>showplaylist(item)}
                                    key={item.id} 
                                    className="cursor-pointer relative group w-56 mb-5 bg-neutral-800 hover:bg-neutral-600 rounded-md p-4">
                                    <div className="absolute opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-200 shadow-2xl shadow-neutral-900 z-10 h-12 w-12 flex items-center justify-center rounded-full bg-green-500 top-[156px] group-hover:top-[148px] right-6">
                                        <PlayIcon className='h-6 w-6 text-black'/>
                                    </div>
                                    <img className="w-48 h-48 mb-4" src={item?.images[0]?.url}/>
                                    <p className="text-base text-white mb-1 w-48 truncate">{item.name}</p>
                                    <p className="text-sm text-neutral-400 mb-8 w-48 truncate">By {item.owner.display_name}</p>
                                </div>
                            })
                            
                        }
                    </div>
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white mb-5">Travel</h2>
                    <div className="flex flex-wrap gap-6 mb-5" >
                        {
                            roadtripData?.slice(0,5).map((item)=>{
                                return <div onClick={()=>showplaylist(item)}
                                    key={item.id} 
                                    className="cursor-pointer relative group w-56 mb-5 bg-neutral-800 hover:bg-neutral-600 rounded-md p-4">
                                    <div className="absolute opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-200 shadow-2xl shadow-neutral-900 z-10 h-12 w-12 flex items-center justify-center rounded-full bg-green-500 top-[156px] group-hover:top-[148px] right-6">
                                        <PlayIcon className='h-6 w-6 text-black'/>
                                    </div>
                                    <img className="w-48 h-48 mb-4" src={item?.images[0]?.url}/>
                                    <p className="text-base text-white mb-1 w-48 truncate">{item.name}</p>
                                    <p className="text-sm text-neutral-400 mb-8 w-48 truncate">By {item.owner.display_name}</p>
                                </div>
                            })
                            
                        }
                    </div>
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white mb-5">Burn that extra fat</h2>
                    <div className="flex flex-wrap gap-6 mb-5" >
                        {
                            workoutData?.slice(0,5).map((item)=>{
                                return <div onClick={()=>showplaylist(item)}
                                    key={item.id} 
                                    className="cursor-pointer relative group w-56 mb-5 bg-neutral-800 hover:bg-neutral-600 rounded-md p-4">
                                    <div className="absolute opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-200 shadow-2xl shadow-neutral-900 z-10 h-12 w-12 flex items-center justify-center rounded-full bg-green-500 top-[156px] group-hover:top-[148px] right-6">
                                        <PlayIcon className='h-6 w-6 text-black'/>
                                    </div>
                                    <img className="w-48 h-48 mb-4" src={item?.images[0]?.url}/>
                                    <p className="text-base text-white mb-1 w-48 truncate">{item.name}</p>
                                    <p className="text-sm text-neutral-400 mb-8 w-48 truncate">By {item.owner.display_name}</p>
                                </div>
                            })
                            
                        }
                    </div>
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white mb-5">Relax</h2>
                    <div className="flex flex-wrap gap-6 mb-5" >
                        {
                            sleepData?.slice(0,5).map((item)=>{
                                return <div onClick={()=>showplaylist(item)}
                                    key={item.id} 
                                    className="cursor-pointer relative group w-56 mb-5 bg-neutral-800 hover:bg-neutral-600 rounded-md p-4">
                                    <div className="absolute opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-200 shadow-2xl shadow-neutral-900 z-10 h-12 w-12 flex items-center justify-center rounded-full bg-green-500 top-[156px] group-hover:top-[148px] right-6">
                                        <PlayIcon className='h-6 w-6 text-black'/>
                                    </div>
                                    <img className="w-48 h-48 mb-4" src={item?.images[0]?.url}/>
                                    <p className="text-base text-white mb-1 w-48 truncate">{item.name}</p>
                                    <p className="text-sm text-neutral-400 mb-8 w-48 truncate">By {item.owner.display_name}</p>
                                </div>
                            })
                            
                        }
                    </div>
                </div>
                <div className=" pb-8 mb-10">
                    <h2 className="text-xl font-bold text-white mb-5">Mood Booster</h2>
                    <div className="flex flex-wrap gap-6 mb-5" >
                        {
                            happy?.slice(0,5).map((item)=>{
                                return <div onClick={()=>showplaylist(item)}
                                    key={item.id} 
                                    className="cursor-pointer relative group w-56 mb-5 bg-neutral-800 hover:bg-neutral-600 rounded-md p-4">
                                    <div className="absolute opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-200 shadow-2xl shadow-neutral-900 z-10 h-12 w-12 flex items-center justify-center rounded-full bg-green-500 top-[156px] group-hover:top-[148px] right-6">
                                        <PlayIcon className='h-6 w-6 text-black'/>
                                    </div>
                                    <img className="w-48 h-48 mb-4" src={item?.images[0]?.url}/>
                                    <p className="text-base text-white mb-1 w-48 truncate">{item.name}</p>
                                    <p className="text-sm text-neutral-400 mb-8 w-48 truncate">By {item.owner.display_name}</p>
                                </div>
                            })
                            
                        }
                    </div>
                </div>
                <br/>
            </div>
        </div>
    )
}

export default HomePage