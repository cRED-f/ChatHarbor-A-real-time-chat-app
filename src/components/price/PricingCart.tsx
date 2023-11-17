import { CheckIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import CheckOutBtn from "./CheckOutBtn";

interface rp {
  redirectTo: boolean;
}

export default function PricingCart({ redirectTo }: rp) {
  return (
    <div
      className="mx-auto grid max-w-sm grid-cols-1 gap-8 md:max-w-4xl
  md:grid-cols-2"
    >
      {PriceList.map((items) => (
        <div
          key={items.id}
          className="flex flex-col justify-between rounded-3xl bg-white dark:bg-gray-300/100 p-8 shadow-xl ring-1 ring-gray-900/10"
        >
          <div>
            <h3 className="text-base font-semibold leading-7 text-indigo-600">
              {items.name}
            </h3>
            <div className="mt-4 flex items-baseline gap-x-2">
              {items.priceMonthly ? (
                <>
                  <span className="text-5xl font-bold tracking-tight text-gray-900">
                    {items.priceMonthly}
                  </span>
                  <span className="text-base font-semibold leading-7 text-gray-600">
                    month
                  </span>
                </>
              ) : (
                <span className="text-5xl font-bold tracking-tight text-gray-900">
                  Free
                </span>
              )}
            </div>
            <p className="mt-6 text-base leading-7 text-gray-600">
              {items.description}
            </p>
            <ul
              role="list"
              className="mt-10 space-y-4 text-sm leading-6 text-gray-600"
            >
              {items.get.map((get) => (
                <li key={get} className="flex gap-x-3">
                  <CheckIcon
                    className="h-6 w-5 flex-none text-indigo-600"
                    aria-hidden="true"
                  />
                  {get}
                </li>
              ))}
            </ul>
          </div>
          {redirectTo ? (
            <Link
              href="/register"
              className=" bg-gradient-to-br from-[#2537c0]
              to-[#2195bb] rounded-md mt-4 py-2 text-center text-white  font-semibold hover:from-[#2537c0] hover:to-[#a62bfd]"
            >
              Get Started Today
            </Link>
          ) : (
            items.id && <CheckOutBtn />
          )}
        </div>
      ))}
    </div>
  );
}

const PriceList = [
  {
    name: "Free",
    id: null,
    href: "#",
    priceMonthly: null,
    description: "Get chatting right away with anyone, anywhere!",
    get: [
      "20 Message Chat Limit in Chats",
      "2 Participant limit in Chat",
      "3 Chat Rooms limit",
      "48-hour support response time",
    ],
  },
  {
    name: "Pro",
    id: "fff_dsadnfjd12ndjfn",
    href: "#",
    priceMonthly: "$9.99",
    description: "Unlimited Chatting with anyone, anywhere!",
    get: [
      "Unlimited Messages in Chats",
      "Unlimited Participant in Chats",
      "Unlimited Chat Rooms",
      "24-hour support response time",
      "Early Access to new features",
    ],
  },
];
