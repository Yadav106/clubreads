import React from 'react'
import { useSession } from 'next-auth/react'
import NavBar from '../components/NavBar'

const Clubs = () => {
    // const session = useSession()
    // session.data.user?.email
  return (
    <div className='h-[100%]'>
      <NavBar />
    </div>
  )
}

export default Clubs