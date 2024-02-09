"use client";

import { Task } from "@prisma/client";
import { Checkbox } from "./ui/checkbox";
import { formatDate } from "date-fns";
import { cn } from "../lib/utils";
import { useTransition } from "react";
import { setTaskDone } from "../actions/task";
import { useRouter } from "next/navigation";


const getExpirationColor = (expiresAt: Date) => {
    const days = Math.floor(expiresAt.getTime() - Date.now()) / 1000 / 60 / 60;
    if (days < 0) return "text-red-500 dark:text-red-400 font-normal";
    if (days <= 2 * 24) return "text-red-500 dark:text-red-400";
    if (days <= 5 * 24) return "text-orange-500 dark:text-orange-400";
    return "text-green-500 dark:text-green-400";
}
export default function TaskCard({ task }: { task: Task }) {
    const router = useRouter();
    const [isLoading, startTransition] = useTransition();

    return (
        <div className="flex items-start gap-2">
            <Checkbox
                id={task.id.toString()}
                className="w-5 h-5" checked={task.done}
                disabled={task.done || isLoading}
                onCheckedChange={() => {
                    startTransition(async () => { await setTaskDone(task.id) });
                    router.refresh();
                }} />
            <label htmlFor={task.id.toString()} className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 decoration-1 dark:decoration-white", task.done && "line-through")}>
                {task.content}
                {task.expiresAt && (
                    <p
                        className={cn("text-xs text-neutral-500 dark:text-neutral-400",
                            (!task.done && getExpirationColor(task.expiresAt) === "text-red-500 dark:text-red-400 font-normal") ? `${getExpirationColor(task.expiresAt)} animate-pulse font-bold` : getExpirationColor(task.expiresAt))}
                    >
                        {formatDate(task.expiresAt, "dd/MM/yyyy")}
                    </p>
                )}
            </label>
        </div>
    )
}
