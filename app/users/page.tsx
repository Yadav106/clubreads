"use client"

import axios from "axios";
import { signOut } from "next-auth/react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import UserButton from "./components/UserButton";

const Users = () => {

    useEffect(() => {
        async function getClubs() {
            try {
                const response = await axios.get('/api/clubs')
                const data = response.data
                console.log(data)
            } catch (error: any) {
                console.log(error)
                toast.error("Something went wrong while fetching all clubs")
            }
        }

        getClubs()
    }, [])

    async function createClub() {
        axios.post(
            '/api/clubs/create',
            {
                name: "Another Club",
                desc: "Testing More Club Creation"
            }
        )
    }

    async function joinClub() {
        axios.post(
            '/api/clubs/join',
            {
                clubId: "66783d84e269e93843463777"
            }
        )
    }

    async function getMyClubs() {
        axios.get('/api/clubs/myclubs')
    }

    async function findBook() {
        axios.post(
            '/api/books/getBookById',
            {
                bookId: "66783fc1705c92b19342e7b4"
            }
        )
    }

    async function addBook() {
        axios.post(
            '/api/books/add',
            {
                clubId: "66783d84e269e93843463777",
                name: "White Nights",
                author: "Fyodor Dostoevsky",
                desc: "Our young nameless loner protagnist meets a lady who tells him not to fall in love with her as she loves someone else, but he still falls in love with her.",
                pages: 100,
            }
        ).catch((err:any) => {
            console.log(err)
        }) 
    }

    return ( 
        <>
            <button onClick={() => signOut()}>
                Logout
            </button> <br /><br />
            <button onClick={() => createClub()}>
                Create Club
            </button><br /><br />
            <button onClick={() => joinClub()}>
                Join Club
            </button><br /><br />
            <button onClick={() => addBook()}>
                Add Book
            </button><br /><br />
            <button onClick={() => getMyClubs()}>
                My Clubs
            </button><br /><br />
            <button onClick={() => findBook()}>
                Find Book
            </button><br /><br />
            <UserButton />
        </>
     );
}
 
export default Users;