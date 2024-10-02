"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomForm from "./CustomForm";
import { Loader2 } from "lucide-react";
import { authFormSchema } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/user.actions";


const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState<string>("");
  const [isLoading, setIsloading] = useState<boolean>(false);
  const router = useRouter();



  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsloading(true);
    try {
      // Sign up with Appwrite & create plain link token
      if (type === "sign-up") {
        const newUser = await signUp(values);

        setUser(newUser);
      }

      if (type === "sign-in") {
         const response = await signIn({
            email: values.email,
            password: values.password,
         });

         if(response){
            router.push("/");
         }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="mb-12 cursor-pointer items-center gap-1 flex">
          <Image
            src="/icons/logo.svg"
            alt="logo"
            width={34}
            height={34}
            className="size-[24px] md:size-14"
          />
          <h1 className="sidebar-logo ml-2">Horizon</h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}

            <p className="text-16 font-normal text-gray-600">
              {user
                ? "Link you account to get started"
                : "Please enter your details"}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4"></div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomForm
                      control={form.control}
                      name="firstName"
                      label="First Name"
                      placeholder="Enter your first name"
                    />
                    <CustomForm
                      control={form.control}
                      name="lastName"
                      label="Last Name"
                      placeholder="Enter your last name"
                    />
                  </div>
                  <CustomForm
                    control={form.control}
                    name="address"
                    label="Address"
                    placeholder="Enter your specific address"
                  />
                  <CustomForm
                    control={form.control}
                    name="city"
                    label="City"
                    placeholder="Enter your city"
                  />
                  <div className="flex gap-4">
                    <CustomForm
                      control={form.control}
                      name="state"
                      label="State"
                      placeholder="ex: NY"
                    />
                    <CustomForm
                      control={form.control}
                      name="postalCode"
                      label="Postal Code"
                      placeholder="ex: 10001"
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomForm
                      control={form.control}
                      name="dateOfBirth"
                      label="Date of Birth"
                      placeholder="YYYY-MM-DD"
                    />
                    <CustomForm
                      control={form.control}
                      name="ssn"
                      label="SSN"
                      placeholder="Example: 1234"
                    />
                  </div>
                </>
              )}

              <CustomForm
                control={form.control}
                name="email"
                label="Email"
                placeholder="Enter your email"
              />
              <CustomForm
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter your password"
              />
              <div className="flex flex-col gap-4">
                <Button type="submit" className="form-btn" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="form-link"
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
