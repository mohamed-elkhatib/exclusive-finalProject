"use server";

import { initialFormStateType, updatePasswordFormSchema } from "@/schema/updatePassword.Schema";

export async function handleUpdatePassword(initialFormState:initialFormStateType ,formData: FormData)
: Promise<initialFormStateType> {
  const formValues = {
    email: formData.get("email"),
    newPassword: formData.get("newPassword"),
    
  };

  const parsedData = updatePasswordFormSchema.safeParse(formValues);

  if (!parsedData.success) {
    return {
      success: false,
      error: parsedData.error.flatten().fieldErrors,
      message: null,
    };
  }

  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formValues),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: {},
        message: data.message,
      };
    }

    return {
      success: true,
      error: {},
      message: data.message,
    };
  } catch (error) {
    console.log("Update password error:", error);
    return {
      success: false,
      error: {},
      message: "Something went wrong. Please try again later.",
    };
  }
}
