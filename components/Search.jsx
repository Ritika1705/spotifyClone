import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { ChevronDownIcon, PlayIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useSession, signOut } from "next-auth/react";
import FeaturedPlaylist from "./FeaturedPlaylist"
import SearchResults from "./SearchResults"

const Search = ({setview, setglobalPlaylistId, setglobalCurrentSongId, setglobalIsTrackPlaying, setglobalArtistId}) => {

    const {data: session} = useSession();
    const [searchData, setsearchData] = useState(null)
    const [inputValue, setinputValue] = useState('')
    const inputRef = useRef(null)

    async function updatesearchresults(query)
    {
        const response = await fetch("https://api.spotify.com/v1/search?" + new URLSearchParams({
            q : query,
            type: ["artist", "playlist", "track"]
        }),
        {
            headers : {
                Authorization : `Bearer ${session.accessToken}`
            }
        })
        
        const data = await response.json();
        setsearchData(data)
    }

    useEffect(() => {
        inputRef.current.focus()
    },[inputRef])

    return (
        <div className="flex-grow h-screen">
            <header className="text-white sticky top-0 h-20 z-10 text-4xl flex items-center px-8">
                <MagnifyingGlassIcon className="absolute top-7 left-10 h-6 w-6 text-neutral-800"/>
                <input value={inputValue} ref={inputRef} onChange={async (e) => {
                    setinputValue(e.target.value)
                    await updatesearchresults(e.target.value)
                }} className=" rounded-full bg-white w-96 pl-12 text-neutral-900 text-base py-2 font-normal outline-0"/>
            </header>
            <div onClick={()=> signOut()} className="absolute z-20 top-5 right-8 flex items-center bg-black bg-opacity-70 text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
                <img className="rounded-full w-7 h-7" src={session.user?.image} alt="profile"></img>
                <p className="text-sm">Logout</p>
                <ChevronDownIcon className="h-5 w-5"/>
            </div>
            <div>
                {searchData === null ? <FeaturedPlaylist
                    setview={setview}
                    setglobalPlaylistId={setglobalPlaylistId}
                /> : <SearchResults
                    playlists = {searchData?.playlists?.items}
                    songs = {searchData?.tracks?.items}
                    artists = {searchData?.artists?.items}
                    setview = {setview}
                    setglobalPlaylistId = {setglobalPlaylistId}
                    setglobalCurrentSongId = {setglobalCurrentSongId}
                    setglobalIsTrackPlaying = {setglobalIsTrackPlaying}
                    setglobalArtistId = {setglobalArtistId}
                />}
            </div>
        </div>
    )
}

export default Search