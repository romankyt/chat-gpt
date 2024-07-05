"use client";

import { useAppSelector } from "@/redux/hooks/redux-hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const MiddleWareComponent = () => {
  const user = useAppSelector((state) => state.user.user);
  const router = useRouter();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (user && authToken) {
      router.push("/content");
    } else if (!authToken) {
      router.push("/auth");
    }
  }, [user, router]);

  return <main className="w-full h-full"></main>;
};
