"use client"

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import PlaylistView from "./PlaylistView";
import Sidebar from "./Sidebar";
import Player from "./Player"
import Library from "./LibraryView"
import Search from "./Search"
import Artist from "./Artist"
import HomePage from "./HomePage"

export const FrontPage = () => {

    const[view, setview] = useState("homepage")
    const[globalPlaylistId, setglobalPlaylistId] = useState(null)
    const[globalArtistId, setglobalArtistId] = useState(null)
    const[globalCurrentSongId, setglobalCurrentSongId] = useState(null)
    const[globalIsTrackPlaying, setglobalIsTrackPlaying] = useState(false)

    return(
        <>
            <main className="h-screen overflow-hidden bg-black">
                <div className="flex w-full">
                    <Sidebar
                        view={view}
                        setview={setview}
                        setglobalPlaylistId={setglobalPlaylistId}
                    />
                    {view==="homepage" && <HomePage
                        setview={setview}
                        setglobalPlaylistId={setglobalPlaylistId}
                    />}
                    {view==="playlist" && <PlaylistView 
                        globalPlaylistId = {globalPlaylistId}
                        setglobalCurrentSongId={setglobalCurrentSongId}
                        setglobalIsTrackPlaying={setglobalIsTrackPlaying}
                        setview={setview}
                        setglobalArtistId = {setglobalArtistId}
                    />}
                    {view==="library" && <Library
                        setview={setview}
                        setglobalPlaylistId={setglobalPlaylistId}
                    />}
                    {view==="search" && <Search
                        setview={setview}
                        setglobalPlaylistId={setglobalPlaylistId}
                        setglobalCurrentSongId={setglobalCurrentSongId}
                        setglobalIsTrackPlaying={setglobalIsTrackPlaying}
                        setglobalArtistId = {setglobalArtistId}
                    />}
                    {view==="artist" && <Artist 
                        setview={setview}
                        globalArtistId = {globalArtistId}
                        setglobalArtistId = {setglobalArtistId}
                        setglobalCurrentSongId={setglobalCurrentSongId}
                        setglobalIsTrackPlaying={setglobalIsTrackPlaying}
                    />}
                </div>
            </main>
            <div className="sticky z-20 bottom-0 h-24 w-full">
                <Player 
                    globalCurrentSongId={globalCurrentSongId}
                    setglobalCurrentSongId={setglobalCurrentSongId}
                    globalIsTrackPlaying={globalIsTrackPlaying}
                    setglobalIsTrackPlaying={setglobalIsTrackPlaying}
                 />
            </div>
        </>     
    )
}