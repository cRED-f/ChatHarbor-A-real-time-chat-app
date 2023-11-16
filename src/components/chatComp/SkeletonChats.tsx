import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function SkeletonChats() {
  return (
    <>
      {[1, 2, 3].map((item) => (
        <div className="flex flex-col gap-2">
          <div className="flex flex-col items-end">
            <div className="flex items-end gap-2">
              <Skeleton className="h-20 w-[130px]  dark:bg-[#1B4956] bg-gray-600/50 " />

              <div>
                <Skeleton className="h-8 w-8 dark:bg-[#1B4956] bg-gray-600/50 rounded-full" />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start">
            <div className="flex items-end gap-2">
              <div>
                <Skeleton className="h-8 w-8 dark:bg-[#1B4956] bg-gray-600/50 rounded-full" />
              </div>{" "}
              <Skeleton className="h-20 w-[130px] dark:bg-[#1B4956] bg-gray-600/50 " />
            </div>
          </div>{" "}
        </div>
      ))}
    </>
  );
}
