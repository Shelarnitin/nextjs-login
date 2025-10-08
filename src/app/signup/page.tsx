"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import  axios  from "axios";
import toast from "react-hot-toast";




export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");
        } catch (error: any) {
            console.log("Signup Failed", error.message)
            toast.error(error.message);
        }finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);


    return (
        <div className="flex items-center justify-center min-h-screen bg-black text-white">
            <div className="bg-gradient-to-br from-[#0b132b] to-[#1c2541] shadow-lg rounded-2xl p-8 w-96 border border-blue-500/40">
            <h1 className="text-3xl font-bold text-blue-400 text-center mb-6">
                {loading ? "Processing" : "Signup"}
            </h1>
            <div className="flex flex-col">
            <label htmlFor="username">username</label>
            <input 
            className="p-2 mb-4 rounded-md bg-[#1c2541] border border-blue-500/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({...user, username: e.target.value})}
            placeholder="username"
            />
            <label htmlFor="email" className="text-sm text-gray-300 mb-1">email</label>
            <input 
            className="p-2 mb-4 rounded-md bg-[#1c2541] border border-blue-500/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"
            />
            <label htmlFor="password" className="text-sm text-gray-300 mb-1">password</label>
            <input 
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white"
            id="password"
            type="text"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"
            />
            <button
            onClick={onSignup}
            className={`p-2 rounded-md transition duration-300 font-semibold ${
              buttonDisabled
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            >{buttonDisabled ? "No signup" : "Signup"}</button>
            <p className="text-sm text-gray-400 mt-4 text-center">
            {" "}
            <Link href="/login" className="text-blue-400 hover:underline">
              Visit Login Page
            </Link>
          </p>
            </div>
            </div>
        </div>
    )
}