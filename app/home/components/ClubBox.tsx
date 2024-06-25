import { DateTime } from 'next-auth/providers/kakao';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import defjpg from "../../../public/defpic.jpg"
import axios from 'axios';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

interface ClubProps {
    createdAt: DateTime,
    image?: string,
    name: string,
    leaderId: string,
    desc: string;
    currentBook?: string
    leader?: boolean
    id: string
    join?: boolean
    joinedClubIds?: string[]
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
    createdAt, image, name, leaderId, desc, currentBook, leader, id, join, joinedClubIds
}) => {
    const router = useRouter()

    const [book, setBook] = useState<BookProps>()
    const [showAddBook, setShowAddBook] = useState<boolean>(false)

    const [bookName, setBookName] = useState("")
    const [bookAuthor, setBookAuthor] = useState("")
    const [bookPages, setBookPages] = useState("")
    const [bookDesc, setBookDesc] = useState("")

    async function finishBook() {
        await axios.post(
            '/api/clubs/finishBook',
            {
                clubId: id
            }
        )

        location.reload()
    }

    async function addBook() {
        await axios.post(
            '/api/books/add',
            {
                name: bookName,
                author: bookAuthor,
                pages: bookPages,
                desc: bookDesc,
                clubId: id
            }
        )

        location.reload()
    }

    async function joinClub() {
        await axios.post(
            '/api/clubs/join',
            {
                clubId: id
            }
        )

        location.reload()
    }

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
                className='rounded-full border-black border-solid border-4 cursor-pointer'
                onClick={() => router.push(`/clubs/${id}`)}
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
                {new Date(createdAt).getDate()}/{new Date(createdAt).getMonth()+1}
            </div>

            {
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
            }

            {
                join && !joinedClubIds?.includes(id) && (
                    <button className='bg-green-400 rounded-md h-[30px] w-[200px]' onClick={() => joinClub()}>
                        Join
                    </button>
                )
            }

            {
                showAddBook && (
                    <div className='flex flex-col gap-2'>
                        <span className='flex justify-between'>
                            <p>Name : </p>
                            <input onChange={(e) => setBookName(e.target.value)} value={bookName}/>
                        </span>
                        <span className='flex justify-between'>
                            <p>Author : </p>
                            <input onChange={(e) => setBookAuthor(e.target.value)} value={bookAuthor}/>
                        </span>
                        <span className='flex justify-between'>
                            <p>Pages : </p>
                            <input onChange={(e) => setBookPages(e.target.value)} value={bookPages}/>
                        </span>
                        <span className='flex justify-between'>
                            <p>Desc : </p>
                            <input onChange={(e) => setBookDesc(e.target.value)} value={bookDesc}/>
                        </span>
                        <button className='bg-green-400 rounded-md h-[30px]' onClick={() => addBook()}>
                            Add
                        </button>
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default ClubBox