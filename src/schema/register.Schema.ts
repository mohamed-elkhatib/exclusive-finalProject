
import * as z from "zod";
export const registerFormSchema = z
  .object({
    name: z
      .string()
      .nonempty({ message: "name is required" })
      .min(3, "name must be at least 3 characters"),
    email: z.email({ message: "please enter a valid email address" }),
    password: z
      .string()
      .nonempty("password is required")
      .min(6, "password should be at least 6 characters"),
    rePassword: z
      .string()
      .nonempty("password is required")
      .min(6, "password should be at least 6 characters"),
    phone: z
      .string()
      .nonempty("phone is required")
      .regex(/^(\+?20|0)?1[0125][0-9]{8}$/, {
        message: "invalid egyption number",
      }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "passwords do not match",
    path: ["rePassword"],
  });

export type registerSchema = z.infer<typeof registerFormSchema>;

export const formState ={
  sucess:false,
  error:{},
  message:null,
}

export type formStateType={
  success: boolean;
  error:{
    name?:string[];
    email?:string[];
    password?:string[];
    rePassword?:string[];
    phone?:string[];
  }
  message:string | null;
}
