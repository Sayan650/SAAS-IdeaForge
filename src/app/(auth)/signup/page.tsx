"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useMemo, useState } from "react";
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
import Loader from "@/components/global/Loader";
import {
  actionLoginUser,
  actionSignUpUser,
} from "@/lib/server-actions/auth-actions";
import clsx from "clsx";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MailCheck } from "lucide-react";

const SignUpFormSchema = z
  .object({
    email: z.string().describe("Email").email({ message: "Invalid Email" }),
    password: z
      .string()
      .describe("Password")
      .min(8, "Password must be minimum 8 characters"),
    confirmPassword: z
      .string()
      .describe("Confirm Password")
      .min(8, "Password must be minimum 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

const SignUpPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [submitError, setSubmitError] = useState("");
  const [confirmation, setConfirmation] = useState(false);

  const codeExchangeError = useMemo(() => {
    if (!searchParams) return "";
    return searchParams.get("error_description");
  }, [searchParams]);

  const confirmationAndErrorStyles = useMemo(
    () =>
      clsx("bg-primary", {
        "bg-red-500/10": codeExchangeError,
        "border-red-500/50": codeExchangeError,
        "text-red-700": codeExchangeError,
      }),
    [codeExchangeError]
  );

  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });
  const isLoading = form.formState.isSubmitting;

  const onSubmt: SubmitHandler<z.infer<typeof FormSchema>> = async (
    formData
  ) => {
    const { error } = await actionSignUpUser(formData);
    if (error) {
      form.reset();
      setSubmitError(error.message);
    }
    setConfirmation(true);
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
        {!confirmation && !codeExchangeError && (
            <>
              <FormField
              disabled={isLoading}
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email"
                      {...field}
                    />
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
                    <Input
                      type="password"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isLoading}
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full p-6"
              disabled={isLoading}
            >
              {!isLoading ? 'Create Account' : <Loader />}
            </Button>
            </>
        )}
        
        {submitError && <FormMessage>{submitError}</FormMessage>}
        
        <span className="self-center text-left flex justify-start items-start">
          {" "}
          Already have an account ?{" "}
          <Link href="/login" className="text-primary">
            Log In
          </Link>
        </span>
        {(confirmation || codeExchangeError) && (
          <>
            <Alert className={confirmationAndErrorStyles}>
              {!codeExchangeError && <MailCheck className="h-4 w-4" />}
              <AlertTitle>
                {codeExchangeError ? 'Invalid Link' : 'Check your email.'}
              </AlertTitle>
              <AlertDescription>
                {codeExchangeError || 'An email confirmation has been sent.'}
              </AlertDescription>
            </Alert>
          </>
        )}
      </form>
    </Form>
  );
};

export default SignUpPage;
