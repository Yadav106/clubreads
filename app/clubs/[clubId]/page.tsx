import NavBar from '@/app/components/NavBar'
import { DateTime } from 'next-auth/providers/kakao';
import React from 'react'
import ClubPage from './components/ClubPage';

interface ClubIdParams {
    clubId: string
}

const ClubIdPage = async({params} : {params: ClubIdParams}) => {
    // const [books, setBooks] = useState<BookProps[]>([])
    // const [club, setClub] = useState<ClubProps>()

    return (
        <div>
            <NavBar />
            <div className='flex gap-4 px-[10%] mt-5 min-h-[100%]'>
                <div className='w-[100%] flex flex-col gap-4 bg-[#f3ece4] rounded-[12px] p-[3%] min-h-[100%] shadow-md shadow-black/40'>
                    <ClubPage clubId={params.clubId}/>
                </div>
            </div>
        </div>
    )
}

export default ClubIdPage