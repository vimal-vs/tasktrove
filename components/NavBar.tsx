import { UserButton } from "@clerk/nextjs";
import ThemeSwitcher from "./ThemeSwitcher";

export default function NavBar() {
    return (
        <nav className="flex justify-between items-center w-full px-8 p-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">RemindMe</h1>
            <div className="flex gap-4 items-center">
                <UserButton afterSignOutUrl="/" />
                <ThemeSwitcher />
            </div>
        </nav>
    )
}
