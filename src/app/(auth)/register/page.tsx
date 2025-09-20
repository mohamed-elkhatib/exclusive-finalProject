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
import {
  registerFormSchema,
  registerSchema,
} from "@/schema/register.Schema";
import { useActionState, useEffect } from "react";
import { handleRegister } from "@/services/register.services";

const formState={
  success: false,
  error : {},
  message : null,
}
export default function RegisterPage() {
  const router = useRouter();
  const [action, formAction] = useActionState(handleRegister, formState);
  const form = useForm<registerSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

  useEffect(()=>{
    if(action){
      if(!action.success && action.message){
        toast.error(action.message,{
          position:'top-center'
        })
      }
      if(action.success && action.message){
        toast.success(action.message,{
          position:'top-center'
        })
        router.push('/login')
      }
    }
  },[action])



  return (
    <section className="py-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 ">Register</h1>
        <Form {...form}>
          <form action={formAction} className="space-y-8">
            {/* *********** name *********** */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name: </FormLabel>
                  <FormControl>
                    <Input placeholder="mohamed khatib" {...field}  />
                  </FormControl>
                  <FormMessage >{ action.error?.name?.[0]}</FormMessage>
                </FormItem>
              )}
            />
            {/* *********** email*********** */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>email:</FormLabel>
                  <FormControl>
                    <Input placeholder="username@domain.com" {...field}  />
                  </FormControl>
                  <FormMessage >{ action.error?.email?.[0]}</FormMessage>
                </FormItem>
              )}
            />
            {/* *********** password*********** */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>password:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="********"
                      type="password"
                      {...field}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage >{ action.error?.password?.[0]}</FormMessage>
                </FormItem>
              )}
            />
            {/* *********** confirm Password*********** */}
            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>confirm Password:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="********"
                      type="password"
                      {...field}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage >{ action.error?.rePassword?.[0]}</FormMessage>
                </FormItem>
              )}
            />
            {/* *********** Phone *********** */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>phone:</FormLabel>
                  <FormControl>
                    <Input placeholder="01234567891" type="tel" {...field} />
                  </FormControl>
                  <FormMessage >{ action.error?.phone?.[0]}</FormMessage>
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
