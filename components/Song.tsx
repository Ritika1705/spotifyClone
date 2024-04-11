import { PlayIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const Song = ({sno, track, setglobalCurrentSongId,setglobalIsTrackPlaying, setview, setglobalArtistId}) => {

    const {data: session} = useSession();
    const [hover, sethover] = useState(false);

    function millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return (
            seconds == 60 ? (minutes + 1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds
        );
    }

    async function playSong(track){

        setglobalCurrentSongId(track.id)
        setglobalIsTrackPlaying(true)

        if(session && session.accessToken)
        {
            console.log(session)
            //alert(session.accessToken)
            const response = await fetch(`https://api.spotify.com/v1/me/player/play`, {
                method: "PUT",
                headers : {
                    'Authorization': 'Bearer ' + session.accessToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    uris: [track.uri]
                })
            })

            //console.log(track.uri)
            //console.log(response.text);
        } 
    }

    function selectArtist(artist){
        setview("artist")
        setglobalArtistId(artist.id)
    }

    return(
        <div 
            onMouseEnter={()=>sethover(true)} onMouseLeave={()=>sethover(false)} className="grid grid-cols-2 text-neutral-400 text-sm py-4 px-5 hover:bg-white hover:bg-opacity-10 rounded-lg cursor-default">
            <div className="flex items-center space-x-4">
                {
                    hover ? <PlayIcon onClick={async()=> { await playSong(track)}} className="h-5 w-5 text-white"/> : <p className="w-5">{sno + 1}</p>
                }
                {track.album.images[0] != null ? <>
                    <img className="h-10 w-10" src={track.album.images[0].url}></img>
                </>: <></>}
                <div>
                    <p className="w-36 lg:w-64 truncate text-white text-base">{track.name}</p>
                    <p className="w-36 truncate">
                        {
                            track.artists.map((artist,i)=>{
                                return(
                                    <>
                                        <span onClick={()=>selectArtist(artist)} className="hover:underline">{artist.name}</span>
                                        <span>{i != track.artists.length - 1 ? ", ":null}</span>
                                    </>
                                )
                            })
                        }
                    </p>
                </div>
            </div>
            <div className="flex items-center justify-between ml-auto md:ml-0">
                <p className="w-40 truncate hidden md:inline">{track.album.name}</p>
                <p>{millisToMinutesAndSeconds(track.duration_ms)}</p>
            </div>
        </div>
    )    
}

export default Song





