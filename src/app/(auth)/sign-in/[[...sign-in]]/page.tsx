import { SignIn } from "@clerk/nextjs";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Page() {
    return (
        <div className="flex flex-col gap-2 justify-center py-6">
            <SignIn />
            <p className="flex gap-2">Not having an account? <Link href={"/sign-up"} className="flex gap-1 font-medium hover:translate-x-1 transition-all items-center">Sign-up <ArrowTopRightIcon /></Link></p>
        </div>
    )
}