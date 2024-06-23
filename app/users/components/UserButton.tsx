import React from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image';

const UserButton = () => {
    const session = useSession();

    return (
        <div>
            {session?.data?.user?.name}
            {
                session?.data?.user?.image &&
                <Image src={session?.data?.user?.image} alt="profile" width={100} height={100}/>
            }
        </div>
    )
}

export default UserButton