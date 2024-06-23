import { DateTime } from 'next-auth/providers/kakao';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import defjpg from "../../../public/defpic.jpg"
import axios from 'axios';
import toast from 'react-hot-toast';

interface ClubProps {
    createdAt: DateTime,
    image?: string,
    name: string,
    leaderId: string,
    desc: string;
    currentBook?: string
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

const ClubBox:React.FC<ClubProps> = ({
    createdAt, image, name, leaderId, desc, currentBook
}) => {
    const [book, setBook] = useState<BookProps>()
    useEffect(() => {
        async function getBookById() {
            try {
                const response = await axios.post(
                    '/api/books/getBookById',
                    {
                        bookId: currentBook
                    }
                )
    
                const data = response.data
                console.log(data)
                setBook(data)
            } catch (err) {
                console.log(err)
                toast.error("Something went wrong while getting book info")
            }
            
        }

        getBookById()
    }, [currentBook])
  return (
    <div className='flex gap-10 items-start'>
        <div>
            {/* Image */}
            <Image 
                src={image || defjpg}
                alt='club image'
                width={100}
                height={100}
                className='rounded-full border-black border-solid border-4'
            />
        </div>

        <div className='flex flex-col mt-2'>
            {/* info */}
            <div>
                <span className='font-bold'>Name: </span>
                {name}
            </div>

            <div>
                <span className='font-bold'>Description: </span>
                {desc}
            </div>

            <div>
                <span className='font-bold'>Current book: </span>
                {book?.name || "loading..."}
            </div>

            <div>
                <span className='font-bold'>Created at: </span>
                {new Date("2024-06-23T15:21:40.528Z").getDate()}/{new Date("2024-06-23T15:21:40.528Z").getMonth()}
            </div>
        </div>
    </div>
  )
}

export default ClubBox