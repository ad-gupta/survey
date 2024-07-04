"use client";

import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { signUp } from "@/actions/auths";
import { CardDescription } from "../ui/card";

const SignupForm = () => {
  const [err, setErr] = React.useState("");
  const signUpHandler = async (formData: FormData) => {
    const name = formData.get("email") as string | undefined;
    const email = formData.get("email") as string | undefined;
    const password = formData.get("password") as string | undefined;

    if (!name || !email || !password)
      return toast.error("Please enter all fields");  

    const toastId = toast.loading("Signing up...");
    
    const error = await signUp(name, email, password);

    if(!error) {
        toast.success("Signed up successfully", { id: toastId });
      setErr("");
    }
    else {
      toast.error("Account Already created", { id: toastId });
      setErr("Account Already created");
    }
  };
  return (
    <form action={signUpHandler} className="flex flex-col gap-4">
      <Input type="text" placeholder="Name" name="name" />
      <Input type="email" placeholder="Email" name="email" />
      <Input type="password" placeholder="Password" name="password" />
      {err && (
        <CardDescription className="text-red-500 text-center">
          {err}
        </CardDescription>
      )}
      <Button type="submit">Signup</Button>
    </form>
  );
};

export default SignupForm;
