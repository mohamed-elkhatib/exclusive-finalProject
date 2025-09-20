"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import {
  updatePasswordFormSchema,
  updatePasswordSchema,
} from "@/schema/updatePassword.Schema";
import { handleUpdatePassword } from "@/services/updatePassword.services";

const initialFormState = {
  success: false,
  error: {},
  message: null,
};

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [action, formAction] = useActionState(
    handleUpdatePassword,
    initialFormState
  );

  const form = useForm<updatePasswordSchema>({
    resolver: zodResolver(updatePasswordFormSchema),
    defaultValues: {
      email: "",
      newPassword: "",
    },
  });

  useEffect(() => {
    if (action) {
      if (!action.success && action.message) {
        toast.error(action.message, { position: "top-center" });
      }
      if (action.success && action.message) {
        toast.success(action.message, { position: "top-center" });
        router.push("/login");
      }
    }
  }, [action, router]);

  return (
    <section className="py-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Update Password</h1>
        <Form {...form}>
          <form
            action={formAction}
            className="space-y-8"
          >
            {/* Old Password */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>email:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="examble@domain.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.email?.message ||
                      action?.error?.email?.[0]}
                  </FormMessage>
                </FormItem>
              )}
            />

            {/* New Password */}
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="New password"
                      type="password"
                      autoComplete="new-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.newPassword?.message ||
                      action.error?.newPassword?.[0]}
                  </FormMessage>
                </FormItem>
              )}
            />


            <Button type="submit">reset Password</Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
