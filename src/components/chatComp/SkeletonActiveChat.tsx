import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function SkeletonActiveChat() {
  return (
    <>
      {[1, 2, 3].map((item) => (
        <div className="flex gap-1 items-center justify-center">
          <Skeleton className="h-8 w-8 dark:bg-[#1B4956] bg-gray-600/50 rounded-full" />
        </div>
      ))}
    </>
  );
}
