"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import * as z from "zod";
import { FormSchema } from "@/lib/types";
import Image from "next/image";
import Logo from "../../../../public/ideaforgelogo.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";
import { actionLoginUser } from "@/lib/server-actions/auth-actions";

const LoginPage = () => {
  const router = useRouter();
  const [submitError, setSubmitError] = useState("");

  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
    defaultValues: { email: "", password: "" },
  });
  const isLoading = form.formState.isSubmitting;

  const onSubmt: SubmitHandler<z.infer<typeof FormSchema>> = async (
    formData
  ) => {
    const { error } = await actionLoginUser(formData);
    if (error) {
      form.reset();
      setSubmitError(error.message);
    }
    router.replace("/dashboard");
  };

  return (
    <Form {...form}>
      <form
        onChange={() => {
          if (submitError) setSubmitError("");
        }}
        className="flex flex-col gap-4 w-full sm:justify-center sm:w-[400px] space-y-6"
        onSubmit={form.handleSubmit(onSubmt)}
      >
        <Link href="/" className="w-full flex justify-start items-center">
          <Image src={Logo} alt="Cypress logo" height={52} width={50} />
          <span className="font-semibold dark:text-white text-4xl first-letter:ml-2">
            IdeaForge.
          </span>
        </Link>
        <FormDescription
          className="
        text-foreground/60"
        >
          An all-In-One Collaboration and Productivity Platform
        </FormDescription>
        <FormField
          disabled={isLoading}
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={isLoading}
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {submitError && <FormMessage>{submitError}</FormMessage>}
        <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
          {!isLoading ? "Log In" : <Loader />}
        </Button>
        <span className="self-center text-left flex justify-start items-start">
          {" "}
          Dont have an account ?{" "}
          <Link href="/signup" className="text-primary">
            Sign Up
          </Link>
        </span>
      </form>
    </Form>
  );
};

export default LoginPage;
