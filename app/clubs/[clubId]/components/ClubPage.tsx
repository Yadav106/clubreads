"use client"

import axios from 'axios';
import { DateTime } from 'next-auth/providers/kakao';
import React, { useEffect, useState } from 'react'
import defpic from "../../../../public/defpic.jpg"
import Image from 'next/image';
import BookBox from '@/app/home/components/BookBox';

interface ClubPageProps {
    clubId: string
}

interface BookProps {
    id : string,
    image? : string,
    name : string,
    author : string,
    desc : string,
    pages : number,
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

const ClubPage:React.FC<ClubPageProps> = ({
    clubId
}) => {
    const [books, setBooks] = useState<BookProps[]>([])
    const [club, setClub] = useState<ClubProps>()

    useEffect(() => {
        async function getClubFromId() {
            const response = await axios.post(
                '/api/clubs/getClubFromId',
                {
                    clubId: clubId
                }
            )

            const data = response.data

            setClub(data)
        }

        async function getBookByClub() {
            const response = await axios.post(
                '/api/books/getBookByClub',
                {
                    clubId: clubId
                }
            )

            const data = response.data

            setBooks(data)
        }

        getClubFromId()
        getBookByClub()
    }, [clubId])

    return (
        <div>
            {
                club && (
                    <div className='flex gap-10 items-start'>
                    <div>
                        {/* Image */}
                        <Image 
                            src={club.image || defpic}
                            alt='club image'
                            width={100}
                            height={100}
                            className='rounded-full border-black border-solid border-4 cursor-pointer'
                        />
                    </div>

                    <div className='flex flex-col mt-2'>
                        {/* info */}
                        <div>
                            <span className='font-bold'>Name: </span>
                            {club.name}
                        </div>

                        <div>
                            <span className='font-bold'>Description: </span>
                            {club.desc}
                        </div>

                        <div>
                            <span className='font-bold'>Created at: </span>
                            {new Date(club.createdAt).getDate()}/{new Date(club.createdAt).getMonth()+1}
                        </div>

                        {/* {
                            (leader && (book?.name === "Not reading anything")) ?
                            (
                                <div>
                                    <button className='bg-green-400 rounded-md h-[30px] px-2' onClick={() => setShowAddBook(state => !state)}>
                                        {showAddBook ? "Cancel" : "Add Book"}
                                    </button>
                                </div>
                            ) : leader && (
                                <div>
                                    <button className='bg-yellow-400 rounded-md h-[30px] px-2' onClick={() => finishBook()}>
                                        Finish Book
                                    </button>
                                </div>
                            )
                        } */}

                        {/* {
                            join && !joinedClubIds?.includes(id) && (
                                <button className='bg-green-400 rounded-md h-[30px] w-[200px]' onClick={() => joinClub()}>
                                    Join
                                </button>
                            )
                        } */}

                    </div>
                </div>
                )
            }
            {
                books && (
                    <div className='mt-5'>
                        <span className='font-bold text-[30px] mt-10 underline'>Books</span>
                        <div className='flex flex-col gap-3'>
                        {
                            books.map(item => (
                                <BookBox key={item.id} image={item.image} author={item.author} name={item.name} pages={item.pages} desc={item.desc} />
                            ))
                        }
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ClubPage