"use client";

import React from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image';

const UserImage = () => {
    const session = useSession();
    return (
        <div>
            {
                session?.data?.user?.image && 
                <Image 
                    src={session?.data?.user?.image}
                    alt="profile"
                    width={40}
                    height={40}
                    className='rounded-full'
                />
            }
        </div>
    )
}

export default UserImage