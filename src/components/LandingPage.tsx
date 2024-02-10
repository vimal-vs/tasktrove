import { Poppins } from "next/font/google"
import { cn } from "../lib/utils"
import Image from "next/image";
import its_free from "../assets/its_free.svg";
import GetStartedButton from "./GetStartedButton";

const inter = Poppins({ subsets: ["devanagari"], weight: ["400"] });

export default function LandingPage() {
    const heading = "Welcome to TaskTrove";
    const sub_heading = "Streamlined task management and reminders for a stress-free schedule."
    return (
        <div className={cn("w-full h-full flex flex-col gap-5 md:gap-8 justify-center items-center", inter.className)}>
            <h1 className="text-4xl md:text-6xl lg:text-8xl dark:text-neutral-100  text-center md:whitespace-nowrap">{heading}</h1>
            <h2 className="text-lg md:text-3xl text-neutral-500 md:w-5/6 text-center">{sub_heading}</h2>
            <GetStartedButton />
            <Image src={its_free} alt="its_free" className="pointer-events-none translate-x-[4.8rem] -translate-y-[3.2rem] md:translate-x-28 md:-translate-y-[4.9rem] h-28 w-28 md:h-40 md:w-40" />
        </div>
    )
}
