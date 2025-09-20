
import * as z from "zod";
export const LoginFormSchema = z.object({
  email: z.email({ message: "please enter a valid email address" }),
  password: z
    .string()
    .nonempty("password is required")
    .min(6, "password should be at least 6 characters"),
});

export type LoginFormPayload = z.infer<typeof LoginFormSchema>;
