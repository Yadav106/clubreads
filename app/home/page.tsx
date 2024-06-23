"use client";

import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { DateTime } from 'next-auth/providers/kakao';
import axios from 'axios';
import toast from 'react-hot-toast';
import ClubBox from './components/ClubBox';

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
    async function getClubs() {
      try {
        const response = await axios.get('/api/clubs/myclubs')
        const clubs = response.data
        setClubs(clubs)
      } catch (error) {
        console.log(error)
        toast.error("Erorr while fetching clubs")
      }
    }

    getClubs()
  }, [])

  return (
    <div className='h-[100%]'>
      <NavBar />
      {/* <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
        <div style={boxStyle}></div>
        <div style={boxStyle}></div>
      </div> */}

      <div className='flex gap-4 px-[10%] mt-5 h-[100%]'>
        {/* Books */}
        <div className='w-[40%] bg-[#f3ece4] rounded-[12px] min-h-[100%] shadow-md shadow-black/40'>

        </div>

        {/* My Clubs */}
        <div className='w-[75%] bg-[#f3ece4] rounded-[12px] p-[3%] flex flex-col gap-5 shadow-md shadow-black/40'>
          {
            clubs.map((item) => {
              return (
                <ClubBox 
                  key={item.id}
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
          {
            clubs.map((item) => {
              return (
                <ClubBox 
                  key={item.id}
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

const boxStyle = {
  flex: 1,
  height: '800px',
  borderRadius: '10px',
  backgroundColor: '#f0f0f0',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  margin: '10px',
};

export default Home;


// bg-[#f0c19d]