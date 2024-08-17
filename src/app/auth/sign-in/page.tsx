'use client';

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import logo from "../../../assets/logo.png";
import { cn } from "@/src/lib/utils";
import { Righteous } from "next/font/google";
import { useState } from "react";
import Link from "next/link";

const font = Righteous({ subsets: ["latin"], weight: ["400"] });

export default function Page() {
    const { status } = useSession();
    if (status === "authenticated") {
        redirect('/');
    };
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();
    };

    return (
        <div className="bg-neutral-100 dark:bg-transparent w-[600px] rounded-lg shadow-lg overflow-hidden md:mx-auto mx-4 relative">
            <div className="flex px-12 pb-12 md:px-16 md:pb-16 lg:px-20 lg:pb-20">
                <div className="w-full">
                    <Link href={"/"} className="flex justify-center items-center pt-10 pb-6">
                        <Image src={logo} alt="TaskTrove" className="h-16 w-16" />
                        <h1 className={cn("text-4xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent -translate-x-2", font.className)}>askTrove</h1>
                    </Link>
                    <p className="text-base text-gray-600 dark:text-gray-300 text-center pb-4">Log in to continue</p>
                    <button
                        onClick={() => signIn('google', {
                            callbackUrl: `${window.location.origin}`
                        })}
                        className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md border w-full hover:ring-1 ring-neutral-400"
                    >
                        <div className="px-4 py-3">
                            <svg className="h-6 w-6" viewBox="0 0 40 40">
                                <path
                                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                                    fill="#FFC107" />
                                <path
                                    d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                                    fill="#FF3D00" />
                                <path
                                    d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                                    fill="#4CAF50" />
                                <path
                                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                                    fill="#1976D2" />
                            </svg>
                        </div>
                        <h1 className="px-4 py-3 w-full text-center text-gray-600 dark:text-gray-300 font-bold text-sm md:text-base">Sign in with Google</h1>
                    </button>
                    <div className="mt-4 flex items-center justify-between">
                        <span className="border-b w-1/5 lg:w-1/3"></span>
                        <span className="text-xs text-center text-gray-500 uppercase">or</span>
                        <span className="border-b w-1/5 lg:w-1/3"></span>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mt-4">
                            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Email Address</label>
                            <input
                                className="bg-gray-100 dark:bg-gray-500 text-gray-700 dark:text-white focus:outline-none focus:shadow-outline border border-gray-300 dark:border-gray-400 rounded py-2 px-4 block w-full appearance-none"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-between">
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Password</label>
                            </div>
                            <input
                                className="bg-gray-100 dark:bg-gray-500 text-gray-700 dark:text-white focus:outline-none focus:shadow-outline border border-gray-300 dark:border-gray-400 rounded py-2 px-4 block w-full appearance-none"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mt-8">
                            <button
                                className={cn("bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600", (!email || !password) && "pointer-events-none bg-gray-700/40")}
                                type="submit"
                                disabled={!email || !password}
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
