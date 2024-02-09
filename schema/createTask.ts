import { z } from "zod";

export const createTaskSchema = z.object({
    collectionId: z.number().nonnegative(),
    content: z.string().min(2, {
        message: "Content must contain at least 2 characters",
    }),
    expiresAt: z.date().optional()
});

export type createTaskSchemaType = z.infer<typeof createTaskSchema>;