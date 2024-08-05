"use client";

import { useState } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSignin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User signed up:", user);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="border rounded-lg p-5 mx-auto max-w-7xl items-center justify-center flex flex-col">
        <h1 className="font-semibold text-xl text-center">Sign In</h1>
        <div className="flex flex-col space-y-2">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            placeholder="email"
            className="p-2 border rounded-md"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="password"
            className="p-2 border rounded-md"
          />
        </div>
        <button
          className="bg-blue-500 p-2 rounded-md my-3 text-white"
          onClick={handleSignin}
        >
          Sign in
        </button>
        <button
          className="p-2 my-3 text-blue-500 underline"
          onClick={() => router.push("/signup")}
        >
          Don&apos;t have an account yet? Sign up
        </button>
      </div>
    </div>
  );
}

export default Signin;
