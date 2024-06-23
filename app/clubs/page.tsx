"use client"

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import NavBar from '../components/NavBar'
import { DateTime } from 'next-auth/providers/kakao';
import axios from 'axios';
import ClubBox from '../home/components/ClubBox';
import { useRouter } from 'next/navigation';

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

const Clubs = () => {
  const [ownedClubs, setOwnedClubs] = useState<ClubProps[]>([])
  const [allClubs, setAllClubs] = useState<ClubProps[]>([])
  const [showAddClub, setShowAddClub] = useState<boolean>(false)
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")

  const router = useRouter()

  useEffect(() => {
    async function getOwnedClubs() {
      const response = await axios.get('/api/clubs/getOwnedClubs')
      const data = response.data
      setOwnedClubs(data)
    }

    async function getAllClubs() {
      const response = await axios.get('/api/clubs')
      const data = response.data
      setAllClubs(data)
    }

    getOwnedClubs()
    getAllClubs()
  }, [])

  async function createClub() {
    await axios.post(
      '/api/clubs/create',
      {
        name,
        desc
      }
    )
    
    location.reload()
  }

  return (
    <div className='min-h-[100%]'>
      <NavBar />

      <div className='flex gap-4 px-[10%] mt-5 min-h-[100%]'>
        {/* Owned Clubs */}
        <div className='w-[40%] flex flex-col gap-4 bg-[#f3ece4] rounded-[12px] p-[3%] min-h-[100%] shadow-md shadow-black/40'>
        <button className='bg-green-400 rounded-md h-[30px]' onClick={() => setShowAddClub(state => !state)}>
          {showAddClub ? "Cancel" : "Create Club"}
        </button>
        {
          showAddClub && (
            <div className='flex flex-col gap-2'>
              <span className='flex justify-between'>
                <p>Name : </p>
                <input onChange={(e) => setName(e.target.value)} value={name}/>
              </span>
              <span className='flex justify-between'>
                <p>Desc : </p>
                <input onChange={(e) => setDesc(e.target.value)} value={desc}/>
              </span>
              <button className='bg-green-400 rounded-md h-[30px]' onClick={() => createClub()}>
                Add
              </button>
            </div>
          )
        }
        {
            ownedClubs.map((item) => {
              return (
                <ClubBox 
                  key={item.id}
                  image={item.image}
                  name={item.name}
                  leaderId={item.leaderId}
                  createdAt={item.createdAt}
                  currentBook={item.currentBook}
                  desc={item.desc}
                  leader
                />
              )
            })
          }
        </div>

        {/* Other Clubs */}
        <div className='w-[75%] bg-[#f3ece4] rounded-[12px] p-[3%] flex flex-col gap-5 shadow-md shadow-black/40'>
          {
              allClubs.map((item) => {
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
  )
}

export default Clubs