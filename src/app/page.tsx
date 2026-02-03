"use client";
import { Button } from "@/components/ui/button";
import { SignedIn, SignOutButton } from "@clerk/clerk-react";
import { SignedOut, SignUpButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>Home page</h1>
      <SignedOut>
      <SignUpButton mode="modal">Sign Up</SignUpButton>
      </SignedOut>

      <SignedIn>
        <SignOutButton>LogOut</SignOutButton>
      </SignedIn>
    </div>
  );
}
