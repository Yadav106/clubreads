"use client";

import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { DateTime } from 'next-auth/providers/kakao';
import axios from 'axios';
import toast from 'react-hot-toast';
import ClubBox from './components/ClubBox';
import BookBox from './components/BookBox';

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
  id: string,
  createdAt: DateTime,
  image?: string,
  name: string,
  leaderId: string,
  userIds: string[],
  desc: string;
  currentBook?: string
}

const Home = () => {
  const [books, setBooks] = useState<BookProps[]>([])
  const [clubs, setClubs] = useState<ClubProps[]>([])

  useEffect(() => {
    async function getBookById(currentBooks:string[]) {
      const newBooks = await Promise.all(currentBooks.map(async (currentBook) => {
        if (currentBook) {
          try {
            const response = await axios.post(
              '/api/books/getBookById',
              {
                  bookId: currentBook
              }
            )
            return response.data
          } catch (err) {
              console.log(err)
              toast.error("Something went wrong while getting book info")
              return null
          }
        }
        return null;
      }));
    
      setBooks(newBooks.filter(book => book !== null));
    }

    async function getClubs() {
      try {
        const response = await axios.get('/api/clubs/myclubs')
        const clubs = response.data
        setClubs(clubs)
        let bookArr:string[] = []
        clubs.forEach((item:ClubProps) => {
          bookArr.push(item.currentBook || "")
        })
        getBookById(bookArr)
      } catch (error) {
        console.log(error)
        toast.error("Erorr while fetching clubs")
      }
    }

    getClubs()
  }, [])

  return (
    <div className='min-h-[100%]'>
      <NavBar />

      <div className='flex gap-4 px-[10%] mt-5 h-[100%]'>
        {/* Books */}
        <div className='w-[40%] flex flex-col gap-4 bg-[#f3ece4] rounded-[12px] p-[3%] min-h-[100%] shadow-md shadow-black/40'>
          {
            books.map((item) => {
              return (
                <BookBox key={item.id} name={item.name} image={item.image} author={item.author} pages={item.pages} desc={item.desc}/>
              )
            })
          }
        </div>

        {/* My Clubs */}
        <div className='w-[75%] bg-[#f3ece4] rounded-[12px] p-[3%] flex flex-col gap-5 shadow-md shadow-black/40'>
          {
            clubs.map((item) => {
              return (
                <ClubBox 
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  name={item.name}
                  leaderId={item.leaderId}
                  createdAt={item.createdAt}
                  currentBook={item.currentBook}
                  desc={item.desc}
                />
              )
            })
          }
        </div>
      </div>
    </div>
  );
};

export default Home;