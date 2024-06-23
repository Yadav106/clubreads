import React from 'react'
import UserImage from './UserImage'

const NavBar = () => {
  return (
    <div className='h-[50px] bg-[#f0c19d] mt-[1rem] w-[80vw] mx-[10vw] rounded-full px-5 flex justify-between items-center'>
        <div className='flex gap-5'>
            <div>
                Home
            </div>
            <div>
                Clubs
            </div>
        </div>

        <div className='flex gap-5'>
            <div className="flex items-center space-x-4">
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="Search books" 
                        className="px-6 py-1 rounded-md border border-gray-300"
                    />
                </div>
            </div>
            <UserImage />
        </div>
    </div>
  )
}

export default NavBar