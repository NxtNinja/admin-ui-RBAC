import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(3, { message: "Password should be at least 3 characters" })
    .max(20, { message: "Password should be at most 20 characters" }),
});

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Username should be at least 2 characters" }),
  username: z
    .string()
    .min(2, { message: "Username should be at least 2 characters" }),

  password: z
    .string()
    .min(3, { message: "Password should be at least 3 characters" })
    .max(20, { message: "Password should be at most 20 characters" }),
  contactInfo: z
    .string()
    .min(10, { message: "Contact info should be at least 10 characters" })
    .max(10, { message: "Contact info should be at most 10 characters" }),
});

export type Loginschemtype = z.infer<typeof loginSchema>;
export type Registerschemtype = z.infer<typeof registerSchema>;
