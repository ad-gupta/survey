import React from "react";
import { Button } from "../ui/button";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";

const GoogleLogin = () => {
  return (
    <form action={async () => {
      "use server"

      await signIn("google")

      // redirect("/")
    }} >
      <Button type="submit" variant={"outline"}>
        Login with Google
      </Button>
    </form>
  );
};

export default GoogleLogin;
