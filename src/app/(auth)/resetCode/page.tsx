"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";

export default function ResetCodePage() {
  const formSchema = z.object({
    resetCode: z.string().nonempty("this field is required"),
  });

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resetCode: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ resetCode: values.resetCode }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "verified successfully.", {
          position: "top-center",
        });
        router.push("/updatePassword");
      } else {
        toast.error(data.message || "failed to verify", {
          position: "top-center",
        });
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "An error occurred";
      toast.error(message, { position: "top-center" });
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Reset Your Password
          </h1>
          <p className="text-center mb-8">Enter the reset code</p>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="resetCode"
                className="block text-sm font-medium text-gray-700"
              >
                verification code:
              </label>
              <input
                type="number"
                id="resetCode"
                {...form.register("resetCode")}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3"
              />
              {form.formState.errors.resetCode && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.resetCode.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="bg-red-500 text-white w-full py-3 rounded-md"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
