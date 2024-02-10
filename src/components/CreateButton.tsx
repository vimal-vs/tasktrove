"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import CollectionSideBar from "./CollectionSideBar";

export default function CreateButton() {
    const [open, setOpen] = useState(false);
    const handleChange = (open: boolean) => setOpen(open);

    return (
        <div className="w-full rounded-md bg-gradient-to-r from-pink-500 via-red-500 to to-yellow-500 p-[1px]">
            <Button onClick={() => setOpen(true)} variant={"outline"} className="dark:text-white w-full dark:bg-neutral-950 bg-white">
                <span className="bg-gradient-to-r from-red-500 to-orange-500 hover:to-orange-800 bg-clip-text text-transparent text-base font-semibold">Create Collection</span>
            </Button>
            <CollectionSideBar open={open} handleChange={handleChange} />
        </div>
    )
}
