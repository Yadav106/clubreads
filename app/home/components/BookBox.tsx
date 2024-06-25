import React from 'react'
import defjpg from "../../../public/defpic.jpg"
import Image from 'next/image'

interface BookProps {
    image? : string,
    name : string,
    author : string,
    desc : string,
    pages : number,
  }

const BookBox:React.FC<BookProps> = ({
    image, name, author, desc, pages
}) => {
  return (
    <div className='flex gap-10 items-start'>
        <div>
            {/* Image */}
            <Image 
                src={image || defjpg}
                alt='club image'
                width={100}
                height={100}
                className='rounded-md border-black border-solid border-4'
            />
        </div>

        <div className='flex flex-col mt-2'>
            {/* info */}
            <div>
                <span className='font-bold'>Name: </span>
                {name}
            </div>

            <div>
                <span className='font-bold'>Author: </span>
                {author}
            </div>

            <div>
                <span className='font-bold'>Pages: </span>
                {pages}
            </div>
        </div>
    </div>
  )
}

export default BookBox