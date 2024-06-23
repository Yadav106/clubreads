import { DateTime } from 'next-auth/providers/kakao';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import defjpg from "../../../public/defpic.jpg"
import axios from 'axios';
import toast from 'react-hot-toast';
import clsx from 'clsx';

interface ClubProps {
    createdAt: DateTime,
    image?: string,
    name: string,
    leaderId: string,
    desc: string;
    currentBook?: string
    leader?: boolean
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
    createdAt, image, name, leaderId, desc, currentBook, leader
}) => {
    const [book, setBook] = useState<BookProps>()

    useEffect(() => {
        async function getBookById() {
            if (!currentBook) {
                const nullBook: BookProps = {
                    id: "404",
                    name: "Not reading anything",
                    author: "Dev",
                    desc: "Null book desc",
                    pages: 404,
                    clubId: "404"
                }
                setBook(nullBook)
                return
            }

            try {
                const response = await axios.post(
                    '/api/books/getBookById',
                    {
                        bookId: currentBook
                    }
                )
                const data = response.data
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
        <div className={clsx(leader && "w-[40%]")}>
            {/* Image */}
            <Image 
                src={image || defjpg}
                alt='club image'
                width={100}
                height={100}
                className='rounded-full border-black border-solid border-4'
            />
        </div>

        <div className={
            clsx('flex flex-col mt-2', leader && "max-w-[60%]")
        }>
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
                {new Date(createdAt).getDate()}/{new Date(createdAt).getMonth()}
            </div>
        </div>
    </div>
  )
}

export default ClubBox