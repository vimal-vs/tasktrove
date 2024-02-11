"use client";

import ThemeSwitcher from "./ThemeSwitcher";
import Link from "next/link";
import { Button } from "./ui/button";
import { Righteous } from "next/font/google";
import { cn } from "../lib/utils";
import { signIn, signOut, useSession } from "next-auth/react";
import sendEmail from "../actions/sendEmail";
import { useEffect } from "react";

const font = Righteous({ subsets: ["latin"], weight: ["400"] });

export default function NavBar() {

    const { data: session, status } = useSession();

    useEffect(() => {
        async function handleAuthStatus() {
            if (status === "authenticated") {
                try {
                    await sendEmail(session, status);
                } catch (error) {
                    console.error("Error sending email:", error);
                }
            }
        }
        handleAuthStatus();
    }, [session]);

    return (
        <nav className="flex justify-between items-center w-full px-6 p-4 shadow-md">
            <Link href={"/"}><h1 className={cn("text-3xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent", font.className)}>TaskTrove</h1></Link>
            <div className="flex gap-4 items-center">
                <ThemeSwitcher />
                {status !== "authenticated" ? (
                    <Button variant={"outline"} className="bg-gradient-to-r from-red-500 to-orange-500 text-white hover:text-white" onClick={() => signIn('google', {
                        callbackUrl: `${window.location.origin}`
                    })}>Sign In</Button>
                ) : (
                    <Button variant={"outline"} className="bg-gradient-to-r from-red-500 to-orange-500 text-white hover:text-white" onClick={() => signOut()}>Sign Out</Button>
                )}
            </div>
        </nav>
    )
}
