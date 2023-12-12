import { z } from "zod";

export const mailSchema = z.object({
    to: z.string().email("Please enter a valid Email address"),
    subject: z.string().optional(),
    body: z.string().min(2, "Your message is too short!")
})