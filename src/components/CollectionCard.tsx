"use client";

import { Collection, Task } from "@prisma/client"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { useMemo, useState, useTransition } from "react"
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
import CreateTaskModal from "./CreateTaskModal";
import TaskCard from "./TaskCard";

interface Props {
    collection: Collection & {
        tasks: Task[];
    };
}

export default function CollectionCard({ collection }: Props) {

    const [isOpen, setIsOpen] = useState(false);
    const [createTaskModal, setCreateTaskModal] = useState(false);
    const router = useRouter();
    const [isLoading, startTransition] = useTransition();

    const tasks = collection.tasks;

    const deleteSelectedCollection = async () => {
        try {
            await deleteCollection(collection.id);
            toast({
                title: "Deleted",
                description: "Collection deleted successfully",
                duration: 2000,
            })
            router.refresh();
        } catch (error) {
            toast({
                title: "Error",
                description: "Unable to delete collection",
                variant: "destructive",
            })
        }
    }
    const tasksDone = useMemo(() => {
        return collection.tasks.filter((task) => task.done).length;
    }, [collection.tasks]);

    const totalTasks = collection.tasks.length;

    const progress = collection.tasks.length === 0 ? 0 : (tasksDone / totalTasks) * 100;

    return (
        <>
            <CreateTaskModal
                open={createTaskModal}
                setOpen={setCreateTaskModal}
                collection={collection}
            />
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
                        {!isOpen && <CaretDownIcon className="h-6 w-6 text-white" />}
                        {isOpen && <CaretUpIcon className="h-6 w-6 text-white" />}
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="flex rounded-b-md flex-col bg-white dark:bg-neutral-900 shadow-lg">
                    {tasks?.length === 0 && (
                        <Button variant="ghost" className="flex items-center justify-center gap-1 p-8 py-12 rounded-none" onClick={() => setCreateTaskModal(true)}>
                            <p>No tasks yet</p>
                            <span
                                className={cn("text-sm bg-clip-text text-transparent", CollectionColors[collection.color as CollectionColor])}
                            >
                                Create one
                            </span>
                        </Button>
                    )}
                    {tasks?.length > 0 && (
                        <>
                            <Progress className="rounded-none" value={progress} />
                            <div className="flex flex-col gap-3 p-4">
                                {tasks?.map((task: any) => (
                                    <TaskCard key={task.id} task={task} />
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
                                    <Button size={"icon"} variant={"ghost"} onClick={() => setCreateTaskModal(true)}>
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
        </>
    )
}
