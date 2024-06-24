import NavBar from '@/app/components/NavBar'
import { DateTime } from 'next-auth/providers/kakao';
import React from 'react'

interface ClubIdParams {
    clubId: string
}

interface BookProps {
    id : string,
    image? : string,
    name : string,
    author : string,
    desc : string,
    pages : Number,
    clubId : string
}

interface ClubProps {
    createdAt: DateTime,
    image?: string,
    name: string,
    leaderId: string,
    desc: string;
    currentBook?: string
    leader?: boolean
    id: string
}

const ClubIdPage = async({params} : {params: ClubIdParams}) => {
    // const [books, setBooks] = useState<BookProps[]>([])
    // const [club, setClub] = useState<ClubProps>()

    return (
        <div>
            <NavBar />
            {params.clubId}
        </div>
    )
}

export default ClubIdPage