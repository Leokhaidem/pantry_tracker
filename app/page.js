"use client";

import { Box, Button, Paper, Stack } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="h-screen flex justify-center items-center bg-slate-200">
      <Paper
        className="flex flex-col justify-center items-center rounded-xl p-8 lg:p-12 h-auto w-[90%] max-w-[600px]"
        elevation={24}
      >
        <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-black py-2 text-center">
          Transform Your Pantry with{" "}
          <span className="text-blue-500">Pantry Tracker</span>
        </p>
        <p className="font-medium pt-2 text-center text-lg md:text-xl">
          Experience a smarter, more organized way to manage your pantry.
        </p>
        <p className="pt-2 text-center text-base md:text-lg text-gray-700">
          Simplify your pantry management and keep track of your inventory effortlessly.
        </p>
        <Stack spacing={2} className="w-full mt-4">
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2"
            variant="contained"
            fullWidth
            onClick={() => router.push("/signup")}
          >
            Join Now
          </Button>
          <Button
            className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white py-2"
            variant="outlined"
            fullWidth
            onClick={() => router.push("/signin")}
          >
            Log In
          </Button>
        </Stack>
      </Paper>
    </div>
  );
}
