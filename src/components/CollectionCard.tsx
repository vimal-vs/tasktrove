"use client";

import { Collection } from "@prisma/client"
import { Collapsible, CollapsibleTrigger } from "./ui/collapsible"
import { useState, useTransition } from "react"
import { CollectionColor, CollectionColors } from "../lib/constants";
import { CaretDownIcon, CaretUpIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import { useRouter } from "next/navigation";

interface Props {
    collection: Collection
}

export default function CollectionCard({ collection }: Props) {

    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const [showCreateModal, setShowCreateModal] = useState(false);

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
                <Button
                    variant={"ghost"}
                    className={cn(
                        "flex w-full justify-between p-6",
                        isOpen && "rounded-b-none",
                        CollectionColors[collection.color as CollectionColor]
                    )}
                >
                    <span className="text-white font-bold">{collection.name}</span>
                    {!isOpen && <CaretDownIcon className="h-6 w-6" />}
                    {isOpen && <CaretUpIcon className="h-6 w-6" />}
                </Button>
            </CollapsibleTrigger>
        </Collapsible>
    )
}
