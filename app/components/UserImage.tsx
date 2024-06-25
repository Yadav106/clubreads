"use client";

import React from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image';

interface UserImageProps {
    setShowMore: (state:boolean) => void,
    showMore: boolean
}

const UserImage:React.FC<UserImageProps> = ({
    setShowMore,
    showMore
}) => {
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
                    className='rounded-full cursor-pointer'
                    onClick={() => setShowMore(!showMore)}
                />
            }
        </div>
    )
}

export default UserImage