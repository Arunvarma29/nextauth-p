"use client"

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

export default function verifyEmailPage() {

    // const router=useRouter();

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);


    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyemail', { token })
            setVerified(true);
            setError(false)
        } catch (error: any) {
            setError(true);
            console.log(error.response.data);

        }
    }

    useEffect(() => {
        setError(false)
        const urltoken = window.location.search.split("=")[1]
        setToken(urltoken || "")

        // const {query}=router;
        // const urlTokenTwo=query.token;
    }, [])

    useEffect(() => {
        setError(false)
        if (token.length > 0) {
            verifyUserEmail()
        }
    }, [token])

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1 className='text-4xl'>Verify email</h1>
            <h2 className='p-2 bg-orange-400 text-black'>
                {token?`${token}`:"no token"}
            </h2>
            {verified && (
            <div>
                <h2>Verified</h2>
                <Link href='/login'>Login</Link>
            </div>
            )}
            {error && (
            <div>
                <h2>Error</h2>
            </div>
            )} 
        </div>
    )
}


