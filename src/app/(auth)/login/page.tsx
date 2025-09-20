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
import { LoginFormPayload, LoginFormSchema } from "@/schema/login.Schema";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const form = useForm<LoginFormPayload>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: LoginFormPayload) {
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl: "/",
      });
      console.log(res);
      if (res?.ok) {
        toast.success("login successfully", {
          position: "top-center",
        });
        router.push("/");
      } else {
        toast.success(res?.error || "something went wrong", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="py-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 ">Login</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* *********** email*********** */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>email</FormLabel>
                  <FormControl>
                    <Input placeholder="username@domain.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* *********** password*********** */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input placeholder="********" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-between items-center">
              <Button type="submit">Login</Button>
            <Link href="/forgetPassword" className="inline-block align-baseline font-bold text-sm text-red-700 underline" >
                Forget Password?
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
