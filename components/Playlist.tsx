"use client"

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";


export const Playlist = () => {
    const {data: session} = useSession();
    const [x,setX] = useState('');
    const [playlist, setplaylist] =  useState([])

    useEffect(() => {

        async function f() {
            if(session && session.accessToken){
                setX(session.accessToken);

                const response = await fetch("https://api.spotify.com/v1/users/31xv44qd5kyfgz64pdf43albdz4u/playlists", {
                    headers : {
                        Authorization : `Bearer ${session.accessToken}`
                    }
                })
                const data = await response.json()
                console.log('hello')
                console.log(data.total)
                setplaylist(data.items)
            }
        }

        f()
    },[session])
    return(
        <main className="flex flex-col items-center">
            <div>access token = {x}</div>
            <div>
                {playlist?.map((playlist)=><div key={playlist.id}>{playlist.name}</div>)}
            </div>
        </main>
    )
}