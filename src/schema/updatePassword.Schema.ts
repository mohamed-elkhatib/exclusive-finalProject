import * as z from "zod";

export const updatePasswordFormSchema = z.object({
  email: z.email({ message: "please enter a valid email address" }),
  
  newPassword: z
    .string()
    .nonempty("New password is required")
    .min(6, "New password should be at least 6 characters"),
});

export type updatePasswordSchema = z.infer<typeof updatePasswordFormSchema>;

export const initialFormState = {
  success: false,
  error: {},
  message: null,
};

export type initialFormStateType = {
  success: boolean;
  error: {
    email?: string[];
    newPassword?: string[];
  };
  message: string | null;
};
