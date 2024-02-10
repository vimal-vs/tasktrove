"use server";

import { createCollectionSchemaType } from "@/schema/createCollection";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import prisma from "../lib/prisma";

export async function createCollection(form: createCollectionSchemaType) {
    const user = await getServerSession(authOptions);

    if (!user) {
        throw new Error("user not found")
    }
    return await prisma.collection.create({
        data: {
            userId: user.user?.email as string,
            color: form.color,
            name: form.name
        }
    })
}

export async function deleteCollection(id: number) {
    const user = await getServerSession(authOptions);
    if (!user) {
        throw new Error("user not found")
    }

    return await prisma.collection.delete({
        where: {
            id: id,
            userId: user.user?.email as string
        }
    })
}