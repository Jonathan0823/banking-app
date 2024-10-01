"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
} from "@/components/ui/form";
import CustomForm from "./CustomForm";
import { Loader2 } from "lucide-react";
import { authFormSchema } from "@/lib/utils";


const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState<string>("");
  const [isLoading, setIsloading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof authFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsloading(true);
    console.log(values);
    setIsloading(false);
  }

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
              <CustomForm control={form.control} name="email" label="Email" placeholder="Enter your email" />
              <CustomForm control={form.control} name="password" label="Password" placeholder="Enter your password" />
              <Button type="submit" className="form-btn" disabled={isLoading}>
                {isLoading ? (<>
                <Loader2 size={20} className="animate-spin"/> &nbsp; Loading...</>): type === "sign-in" ? "Sign In" : "Sign Up"}
                </Button>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p>{type === "sign-in" ? "Don't have an account?" : "Already have an account?"}</p>
            <Link href={type === "sign-in" ? "/sign-up" : "/sign-in"} className="link">{type === "sign-in" ? "Sign Up" : "Sign In"}</Link>
          </footer>

          </>
      )}
    </section>
  );
};

export default AuthForm;
