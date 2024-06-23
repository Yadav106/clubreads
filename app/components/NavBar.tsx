"use client"

import React from 'react';
import UserImage from './UserImage';
import { useRouter } from 'next/navigation';

const NavBar = () => {
    const router = useRouter();
    return (
        <div className='h-[50px] bg-[#f3ece4] mt-[1rem] w-[80vw] mx-[10vw] rounded-[12px] px-5 flex justify-between items-center shadow-sm shadow-black/40'>
            <div className='flex items-center gap-2'>
                <img 
                    src='/logo1.jpg' 
                    alt='Logo' 
                    className='h-[28px] cursor-pointer' 
                    onClick={() => router.push('/home')}
                />
                <div 
                    className='nav-item cursor-pointer px-4 py-2 rounded'
                    onClick={() => router.push('/home')}
                >
                    Home
                </div>
                <div 
                    className='nav-item cursor-pointer px-4 py-2 rounded'
                    onClick={() => router.push('/clubs')}
                >
                    Clubs
                </div>
            </div>

            <div className='flex gap-5'>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Search clubs" 
                            className="px-6 py-1 rounded-md border border-gray-300"
                        />
                        <img 
                            src="/search.svg" 
                            alt="Search Icon" 
                            className="absolute right-3 top-2 w-5 h-5 text-gray-400"
                        />
                    </div>
                </div>
                <UserImage />
            </div>
        </div>
    );
}

export default NavBar;