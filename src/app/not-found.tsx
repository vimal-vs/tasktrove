import Link from "next/link";
import { Button } from "../components/ui/button";

export default function NotFound() {
    return (
        <section className="py-10 w-full">
            <div className="container mx-auto w-full">
                <div className="flex justify-center items-center w-full">
                    <div className="flex flex-col justify-center items-center w-full text-center">
                        <div className="bg-no-repeat bg-contain md:bg-cover h-32 md:h-96 w-1/2" style={{ backgroundImage: 'url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)' }}>
                            <h1 className="text-2xl md:text-6xl text-center text-black">404</h1>
                        </div>
                        <div className="mt-10 w-full">
                            <h3 className="text-xl md:text-5xl w-full">Looks like you're lost 😕</h3>
                            <Link href={"/"}>
                                <Button variant={"secondary"} className="dark:text-white w-fit dark:bg-neutral-900 bg-white mt-6">
                                    <span className="bg-gradient-to-r from-red-500 to-orange-500 hover:to-orange-800 bg-clip-text text-transparent text-base font-bold">Go to  Home</span>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
