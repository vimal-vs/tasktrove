"use client";

import { Collection } from "@prisma/client";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { cn } from "../lib/utils";
import { CollectionColor, CollectionColors } from "../lib/constants";
import { useForm } from "react-hook-form";
import { createTaskSchema, createTaskSchemaType } from "@/schema/createTask";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Textarea } from "./ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";
import { CalendarIcon, ReloadIcon } from "@radix-ui/react-icons";
import { formatDate } from "date-fns";
import { createTask } from "../actions/task";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    collection: Collection
}

export default function CreateTaskModal({ open, setOpen, collection }: Props) {

    const router = useRouter();

    const form = useForm<createTaskSchemaType>({
        resolver: zodResolver(createTaskSchema),
        defaultValues: {
            collectionId: collection.id,
        },
    });

    const openChangeWrapper = (value: boolean) => {
        setOpen(value);
        form.reset();
    };

    const onSubmit = async (data: createTaskSchemaType) => {
        try {
            await createTask(data);
            toast({
                title: "Success",
                description: "Task created successfully!",
                status: "success",
                duration: 2000,
                isClosable: true,
                variant: "success",
            })
            openChangeWrapper(false);
            router.refresh();
        } catch (error) {
            toast({
                title: "Error",
                description: "Unable to create task",
                variant: "destructive",
                isClosable: true,
            })
        }
    }

    return (
        <Dialog open={open} onOpenChange={openChangeWrapper}>
            <DialogContent className="sm:max-w-[435px]">
                <DialogHeader>
                    <DialogTitle className="flex gap-2">
                        Add task to collection:
                        <span className={cn("p-[1px] bg-clip-text text-transparent", CollectionColors[collection.color as CollectionColor])}>
                            {collection.name}
                        </span>
                    </DialogTitle>
                </DialogHeader>
                <div className="mb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Content</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                rows={5}
                                                placeholder="Task content..."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="expiresAt"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Expires At</FormLabel>
                                        <FormControl>
                                            <Popover
                                                {...field}
                                            >
                                                <PopoverTrigger asChild>
                                                    <Button variant="outline" className={cn("justify-start text-left font-normal w-full", !field.value && "text-muted-foreground")}>
                                                        <CalendarIcon className="mr-4 h-4 w-4" />
                                                        {field.value && formatDate(field.value, "PPP")}
                                                        {!field.value && <div>No expiration</div>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent>
                                                    <Calendar
                                                        mode="single"
                                                        fromDate={Date.now()}
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </div>
                <DialogFooter>
                    <Button
                        disabled={form.formState.isSubmitting}
                        className={cn("w-full dark:text-white text-white", CollectionColors[collection.color as CollectionColor])}
                        onClick={form.handleSubmit(onSubmit)}
                    >
                        Submit
                        {form.formState.isSubmitting && (
                            <ReloadIcon className="ml-2 h-4 w-4 animate-spin" />
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}
