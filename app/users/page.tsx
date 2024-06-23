"use client"

import axios from "axios";
import { signOut } from "next-auth/react";
import { useEffect } from "react";
import toast from "react-hot-toast";

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
                name: "New Club",
                desc: "Testing Club Creation"
            }
        )
    }

    async function joinClub() {
        axios.post(
            '/api/clubs/join',
            {
                clubId: "6677eb4f54ba40b309b33aad"
            }
        )
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
            </button>
        </>
     );
}
 
export default Users;