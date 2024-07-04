"use client";

import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { credentialSignIn } from "@/actions/auths";
import { CardDescription } from "../ui/card";

const LoginForm = () => {
  const [err, setErr] = React.useState("");
  const logInHandler = async (formData: FormData) => {
    const email = formData.get("email") as string | undefined;
    const password = formData.get("password") as string | undefined;

    if (!email || !password)
      return toast.error("Please enter email and password");

    const toastId = toast.loading("Logging in...");

    const error = await credentialSignIn(email, password);
    // console.log(error);

    if (error !== "credentials") {
      toast.success("Logged in successfully", { id: toastId });
      setErr("")
    }
      
    else {
      toast.error("Invalid credentials", { id: toastId });
      setErr("Invalid credentials");
    }
  };
  return (
    <form action={logInHandler} className="flex flex-col gap-4">
      <Input type="email" placeholder="Email" name="email" />
      <Input type="password" placeholder="Password" name="password" />
      {err && <CardDescription className="text-red-500 text-center">{err}</CardDescription>}
      <Button type="submit">Login</Button>
    </form>
  );
};

export default LoginForm;
