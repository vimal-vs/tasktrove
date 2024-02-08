"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import ThemeSwitcher from "./ThemeSwitcher";
import Link from "next/link";

export default function NavBar() {
    const { user, isLoaded } = useUser();

    return (
        <nav className="flex justify-between items-center w-full px-8 p-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">TaskTrove</h1>
            <div className="flex gap-4 items-center">
                <ThemeSwitcher />
                {user && isLoaded ? (
                    <UserButton afterSignOutUrl="/" />) : (
                    <Link href={"/sign-in"}>Sign-In</Link>
                )}
            </div>
        </nav>
    )
}
