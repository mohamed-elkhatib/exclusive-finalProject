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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import {
  addressFormSchema,
  addressFormState,
  addressFormType,
} from "@/schema/address.Schema";
import { handlePayment } from "@/services/order.services";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { cartDetails, setCartDetails } = useCart();
  const router = useRouter();
  const [action, formAction] = useActionState(handlePayment, addressFormState);
  const form = useForm<addressFormType>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      cartId: "",
      details: "",
      city: "",
      phone: "",
      paymentMethod: "cash",
    },
  });

  useEffect(() => {
    if (cartDetails) {
      form.setValue("cartId", cartDetails.cartId);
    }
  }, [form,cartDetails]);
  console.log(action);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (action) {
      if (action.success && action.message) {
        if (action.paymentMethod === "cash") {
          toast.success(action.message, { position: "top-center" });
          setCartDetails(null);
          timeout = setTimeout(() => {
            router.push(action.callbackUrl || "/allorders");
          }, 2000);
        } else {
          window.location.href = action.callbackUrl as string;
        }
      } else if (!action.success && action.message) {
        toast.error(action.message, { position: "top-center" });
      }
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [action, router,setCartDetails,form]);

  return (
    <section className="py-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 ">Checkout</h1>
        <Form {...form}>
          <form action={formAction} className="space-y-8">
            {/* *********** name *********** */}
            <FormField
              control={form.control}
              name="cartId"
              render={({ field }) => (
                <FormItem hidden>
                  <FormControl>
                    <Input {...field} value={cartDetails?.cartId} hidden />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* *********** name *********** */}
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address details: </FormLabel>
                  <FormControl>
                    <Input placeholder="mohamed khatib" {...field} />
                  </FormControl>
                  <FormMessage>{action?.error?.details?.[0]}</FormMessage>
                </FormItem>
              )}
            />
            {/* *********** email*********** */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>city:</FormLabel>
                  <FormControl>
                    <Input placeholder="alex" {...field} />
                  </FormControl>
                  <FormMessage>{action?.error?.city?.[0]}</FormMessage>
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
                  <FormMessage>{action?.error?.phone?.[0]}</FormMessage>
                </FormItem>
              )}
            />
            {/* *********** payment *********** */}
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Payment Method</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      name={field.name}
                      className="flex flex-col"
                    >
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="cash" />
                        </FormControl>
                        <FormLabel className="font-normal">Cash</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="card" />
                        </FormControl>
                        <FormLabel className="font-normal">Card</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
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
