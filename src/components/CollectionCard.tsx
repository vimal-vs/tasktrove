"use client";

import { Collection } from "@prisma/client"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { useState, useTransition } from "react"
import { CollectionColor, CollectionColors } from "../lib/constants";
import { CaretDownIcon, CaretUpIcon, PlusIcon, ReloadIcon, TrashIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import { useRouter } from "next/navigation";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { deleteCollection } from "../actions/collection";
import { toast } from "./ui/use-toast";

interface Props {
    collection: Collection
}

export default function CollectionCard({ collection }: Props) {

    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const [isLoading, startTransition] = useTransition();
    const tasks: string[] = ["Task1", "Task2", "Task3", "Task4"];

    const deleteSelectedCollection = async () => {
        try {
            await deleteCollection(collection.id);
            toast({
                title: "Deleted",
                description: "Collection deleted successfully",
                status: "success",
                duration: 2000,
                isClosable: true,
            })
            router.refresh();
        } catch (error) {
            toast({
                title: "Error",
                description: "Unable to delete collection",
                status: "success",
                variant: "destructive",
                isClosable: true,
            })
        }
    }

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
            <CollapsibleContent className="flex rounded-b-md flex-col dark:bg-neutral-900 shadow-lg">
                {tasks?.length === 0 && <div>No tasks</div>}
                {
                    tasks?.length > 0 && (
                        <>
                            <Progress className="rounded-none" value={45} />
                            <div>
                                {tasks?.map((task) => (
                                    <div>Tasak</div>
                                ))}
                            </div>
                        </>
                    )
                }
                <Separator />
                <footer className="h-[40px] px-4 p-[2px] text-sx text-neutral-500 flex justify-between items-center">
                    <p>Created at {collection.createdAt.toLocaleDateString("IND")}</p>
                    {isLoading ? (
                        <ReloadIcon className='ml-2 h-4 w-4 animate-spin' />
                    ) :
                        (
                            <div>
                                <Button size={"icon"} variant={"ghost"}>
                                    <PlusIcon />
                                </Button>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button size={"icon"} variant={"ghost"}>
                                            <TrashIcon />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogTitle>
                                            Are you sure?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone.
                                        </AlertDialogDescription>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>
                                                Cancel
                                            </AlertDialogCancel>
                                            <AlertDialogAction onClick={() => {
                                                startTransition(deleteSelectedCollection);
                                            }}>
                                                Proceed
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        )}
                </footer>
            </CollapsibleContent>
        </Collapsible>
    )
}
