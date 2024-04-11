import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { PlayCircleIcon, PauseCircleIcon } from "@heroicons/react/24/solid";
import { get } from "mongoose";

const Player = ({globalCurrentSongId,setglobalCurrentSongId, globalIsTrackPlaying, setglobalIsTrackPlaying}) => {

    const {data: session} = useSession();
    const[songinfo, setsonginfo] = useState(null);

    async function getsonginfo(trackid){
        if(trackid){
            const response = await fetch('https://api.spotify.com/v1/tracks/' + trackid, {
                headers : {
                    Authorization : `Bearer ${session.accessToken}`
                }
            })
            const data = await response.json()
            setsonginfo(data)
        }
    }

    async function getcurrentplayingsong(trackid){
        if(trackid){
            const response = await fetch(`https://api.spotify.com/v1/me/player/currently-playing`, {
                headers : {
                    Authorization : `Bearer ${session.accessToken}`
                }
            })

            if(response.status == 204){
                console.log("204 response from currently playing")
                return
            }

            const data = await response.json()
            return data
        }
    }

    async function handlePlayPause(){
        if(session && session.accessToken){
            const data = await getcurrentplayingsong(globalCurrentSongId)
            if(data.is_playing)
            {
                const response = await fetch(`https://api.spotify.com/v1/me/player/pause`, {
                method: "PUT",
                headers : {
                        Authorization : `Bearer ${session.accessToken}`
                    }
                })
                if(response.status == 204){
                    setglobalIsTrackPlaying(false)
                }
            }
            else
            {
                const response = await fetch(`https://api.spotify.com/v1/me/player/play`, {
                method: "PUT",
                headers : {
                        'Authorization': 'Bearer ' + session.accessToken,
                        'Content-Type': 'application/json'
                    }
                })

                if(response.status == 204){
                    console.log(data);
                    setglobalIsTrackPlaying(true)
                    setglobalCurrentSongId(data.item.id)
                }
            }
        }
    }

    useEffect(()=>{

        //fetch song details
        async function f(){
            if(session && session.accessToken){
                if(!globalCurrentSongId){
                    //get currently playing song from Spotify
                    const data = getcurrentplayingsong()
                    setglobalCurrentSongId(data?.item?.id)
                    if(data.is_playing)
                    {
                        setglobalIsTrackPlaying(true)
                    }

                    await getsonginfo(data?.item?.id)
                }else{
                    //get song info
                    await getsonginfo(globalCurrentSongId)
                }
            }
        }
        f()
    },[globalCurrentSongId])

    return(
        <div className="h-24 bg-neutral-800 border-t border-neutral-700 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
            <div className="flex items-center space-x-4">
                {/*song details*/}
                {songinfo?.album.images[0].url && <img className="hidden md:inline h-10 w-10" src={songinfo?.album.images[0].url}/>}
                <div>
                    <p className="text-white text-sm">{songinfo?.name}</p>
                    <p className="text-neutral-400 text-xs">{songinfo?.artists[0]?.name}</p>
                </div>
            </div>
            <div className="flex items-center justify-center">
                {globalIsTrackPlaying? <PauseCircleIcon className="h-10 w-10" onClick={handlePlayPause}/> :<PlayCircleIcon className="h-10 w-10" onClick={handlePlayPause}/>}
            </div>
            <div></div>
        </div>
    );
}

export default Player