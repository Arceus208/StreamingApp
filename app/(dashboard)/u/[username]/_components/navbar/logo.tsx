import React from "react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: [
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
  ],
});

export const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center gap-x-4 hover:opacity-75 transition">
        <div className="bg-white rounded-full p-1 mr-12 shrink-0 lg:mr-0 lg:shrink">
          <Image
            src="/spooky.svg"
            alt="logo"
            height={32}
            width={32}
          ></Image>
        </div>
        <div
          className={cn(
            "hidden lg:block",
            font.className
          )}
        >
          <p className="text-lg font-semibold">
            StreamGame
          </p>
          <p className="text-xs text-muted-foreground">
            Creator Dashboard
          </p>
        </div>
      </div>
    </Link>
  );
};