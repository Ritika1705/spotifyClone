import React from "react";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import './Song';
import Song from "./Song";

const PlaylistView = ({globalPlaylistId, setglobalCurrentSongId, setglobalIsTrackPlaying, setview, setglobalArtistId}) => {

    const {data: session} = useSession();

    const colors = [
        'from-indigo-500',
        'from-blue-500',
        'from-green-500',
        'from-red-500',
        'from-yellow-500',
        'from-pink-500',
        'from-purple-500'
    ]

    const [x,setX] = useState('');
    const [color,setColor] = useState(colors[0]);
    const [playlistdata, setplaylistdata] =  useState(null)
    const [opacity, setopacity] = useState(0);
    const [textopacity, settextopacity] = useState(1);

    function changeOpacity(scrollPos){
        const offset = 300
        const textOffset = 10

        console.log(scrollPos);
        console.log(offset);

        if(scrollPos < offset)
        {
            const newOpacity = 1 - ((offset-scrollPos)/offset)
            setopacity(newOpacity)
        }
        else{
            const delta = scrollPos - offset
            const newtextopacity = 1 - ((textopacity-delta)/textOffset)
            setopacity(newtextopacity)
        }
    }
    useEffect(() => {

        async function f() {
            if(session && session.accessToken){
                setplaylistdata(null);
                setX(session.accessToken);
                console.log(session);
                const response = await fetch("https://api.spotify.com/v1/playlists/" + globalPlaylistId, {
                    headers : {
                        Authorization : `Bearer ${session.accessToken}`
                    }
                })
                const data = await response.json()
                setplaylistdata(data);
            }
        }

        f()
    },[session, globalPlaylistId])

    useEffect(() => {
        var shuffle = require('lodash.shuffle');
        setColor(shuffle(colors).pop());
    }, [globalPlaylistId])


    return(
        <div className="flex-grow h-screen">
            <header style={{opacity: opacity}} className="text-white sticky top-0 h-20 z-10 text-4xl bg-neutral-800 p-8 flex items-center font-bold">
                <div style={{opacity: textopacity}} className="flex items-center">
                    {playlistdata && <img className="h-8 w-8 mr-6" src={playlistdata?.images[0]?.url}></img>}
                    <p>{playlistdata?.name}</p>
                </div>
            </header>
            <div onClick={()=> signOut()} className="absolute z-20 top-5 right-8 flex items-center bg-black bg-opacity-70 text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
                <img className="rounded-full w-7 h-7" src={session.user?.image} alt="profile"></img>
                <p className="text-sm">Logout</p>
                <ChevronDownIcon className="h-5 w-5"/>
            </div>
            <div onScroll={(e)=>changeOpacity((e.target as HTMLElement).scrollTop)} className="relative -top-20 h-screen overflow-y-scroll bg-neutral-900">
                <section className={`flex items-end space-x-7 bg-gradient-to-b to-neutral-900 ${color} h-80 text-white pb-10 pl-5`}>
                    {playlistdata && <img className="h-44 w-44" src={playlistdata.images[0].url}></img>}
                    <p className="text-sm font-bold">Playlist</p>
                    <h1 className="text-2xl md:text-3xl lg:text-5xl font-extrabold">{playlistdata?.name}</h1>
                </section>
                <div className="text-white px-8 flex flex-col space-y-1 pb-28">
                    {playlistdata?.tracks.items.map((track,i)=>{
                        return <Song
                            setglobalIsTrackPlaying={setglobalIsTrackPlaying}
                            setglobalCurrentSongId={setglobalCurrentSongId}
                            setview={setview}
                            setglobalArtistId={setglobalArtistId}
                            key={track.track.id}
                            sno={i}
                            track={track.track}
                        />
                    })}
                </div>
            </div>
        </div>
    )
}

export default PlaylistView;