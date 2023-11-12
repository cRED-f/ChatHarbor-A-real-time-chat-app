import React from "react";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import PricingCart from "@/components/price/PricingCart";

export default async function page() {
  const session = await getServerSession(authOptions);
  return (
    <div className="isolate overflow-hidden md:h-screen bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 text-center sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Choose your membership plan {session?.user?.name?.split(" ")?.[0]}
          </p>
        </div>
        <div className="relative mt-6">
          {/* splash effect (svg) */}
          <svg
            viewBox="0 0 1208 1024"
            className="absolute -top-10 left-1/2 -z-10 
        h-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,rgba(0,0,0,1),rgba(0,0,0,0))]
        sm:-top-12 md:-top-20 lg:-top-12 xl:top-0"
          >
            <ellipse
              cx={650}
              cy={550}
              fill="url(#radial-gradient-price)"
              rx={704}
              ry={612}
            />
            <defs>
              <radialGradient id="radial-gradient-price">
                <stop offset={1} stopColor="#00A7B3" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div className="mb-20 mt-0 md:mt-28">
        {" "}
        <PricingCart redirectTo={false} />
      </div>
    </div>
  );
}
