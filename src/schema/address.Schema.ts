import * as z from "zod";
export const addressFormSchema = z.object({
  cartId: z.string().nonempty({ message: "address is required" }),

  details: z
    .string()
    .nonempty({ message: "address is required" })
    .min(3, "address must be at least 3 characters"),

  city: z
    .string()
    .nonempty({ message: "address is required" })
    .min(3, "address must be at least 3 characters"),

  phone: z
    .string()
    .nonempty("phone is required")
    .regex(/^(\+?20|0)?1[0125][0-9]{8}$/, {
      message: "invalid egyption number",
    }),
  paymentMethod: z.enum(["cash", "card"], {
    message: "payment method is required",
  }),
});
export type addressFormType = z.infer<typeof addressFormSchema>;

export const addressFormState = {
  success: false,
  error: {
    cartId: [],
    details: [],
    city: [],
    phone: [],
    paymentMethod: [],
  },
  message: null,
  callbackUrl:"",
};

export type addressFormStateType = {
  success: boolean;
  error: {
    cartId?: string[];
    details?: string[];
    city?: string[];
    phone?: string[];
    paymentMethod?: string[];
  };
  message: string | null;
  callbackUrl?:string;
   paymentMethod?: "cash" | "card";
};
