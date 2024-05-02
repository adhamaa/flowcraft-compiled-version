import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Email is invalid").default(""),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .default(""),
});

const registerSchema = z.object({
  // firstName: z.string().min(2, "First name is required").default(""),
  // lastName: z.string().min(2, "Last name is required").default(""),
  username: z.string().min(2, "Name is required").default(""),
  email: z.string().email("Email is invalid").default(""),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .default(""),
  confirmPassword: z.string().min(6, "Passwords must match").default(""),
  // acceptTerms: z
  //   .boolean()
  //   .default(false)
  //   .refine((value) => value, {
  //     message: "You must accept the terms and conditions",
  //   }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export { registerSchema, loginSchema, z };