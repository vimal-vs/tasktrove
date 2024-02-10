"use server";

import { createTaskSchemaType } from "@/schema/createTask";
import { authOptions } from "../lib/auth";
import { getServerSession } from "next-auth";
import prisma from "../lib/prisma";

export async function createTask(data: createTaskSchemaType) {
    const user = await getServerSession(authOptions);

    if (!user) {
        throw new Error("user not found")
    }

    return await prisma.task.create({
        data: {
            userId: user.user?.email as string,
            content: data.content,
            expiresAt: data.expiresAt,
            Collection: {
                connect: {
                    id: data.collectionId
                }
            }
        }
    })
}

export async function setTaskDone(id: number) {
    const user = await getServerSession(authOptions);
    if (!user) {
        throw new Error("user not found")
    }

    return await prisma.task.update({
        where: {
            id: id,
            userId: user.user?.email as string
        },
        data: {
            done: true
        }
    })
}