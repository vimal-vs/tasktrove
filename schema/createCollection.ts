import { CollectionColors } from "@/src/lib/constants";
import { z } from "zod";

export const createCollectionSchema = z.object({
    name: z.string().min(2, {
        message: "Name must contain at least 2 characters",
    }),
    color: z.string().refine(color => Object.keys(CollectionColors).includes(color)),
});

export type createCollectionSchemaType = z.infer<typeof createCollectionSchema>;