"use client";
import { signIn, signOut, useSession } from "next-auth/react"

export const Appbar = () => {
    const session = useSession();
    return <div>
    <button onClick={() => signIn('spotify', {callbackUrl : "/"})}>Signin</button>
    <button onClick={() => signOut()}>Sign out</button>
    {/* {JSON.stringify(session)} */}
  </div>
}