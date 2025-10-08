"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, {useState} from "react"
import toast from "react-hot-toast";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("nothing")
    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
        } catch (error: any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setData(res.data.data._id)
    }

    return (
         <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="bg-gradient-to-br from-[#0b132b] to-[#1c2541] shadow-lg rounded-2xl p-8 w-96 border border-blue-500/40 text-center">
        <h1 className="text-3xl font-bold text-blue-400 mb-4">Profile</h1>
        <hr className="border-blue-500/30 mb-4" />
        <p className="text-gray-300 mb-2">Your profile details:</p>
        <h2 className="p-2 bg-blue-600 rounded-md text-black font-semibold">
          {data === "nothing" ? "No data" : <Link href={`/profile/${data}`}>{data}</Link>}
        </h2>
        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={getUserDetails}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
          >
            Get User Details
          </button>
          <button
            onClick={logout}
            className="bg-gray-700 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
    )
}