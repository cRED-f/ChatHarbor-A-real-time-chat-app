import PricingCart from "@/components/price/PricingCart";
export default function price() {
  return (
    <div className="isolate overflow-hidden bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 pb-96 pt-24 text-center sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-semibold leading-10 text-indigo-400">
            Price &amp; Plans
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            The Best Deal You Can Get{" "}
          </p>
        </div>
        <div className="relative mt-6">
          <p className="mx-auto max-w-2xl text-lg leading-8 text-white/60">
            We are highly confident that our proposed strategy aligns perfectly
            with all of your requirements
          </p>
          {/* splash effect (svg) */}
          <svg
            viewBox="0 0 1208 1024"
            className="absolute -top-10 left-1/2 -z-10 
            h-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,rgba(0,0,0,1),rgba(0,0,0,0))]
            sm:-top-12 md:-top-20 lg:-top-12 xl:top-0"
          >
            <ellipse
              cx={604}
              cy={512}
              fill="url(#radial-gradient-price)"
              rx={604}
              ry={512}
            />
            <defs>
              <radialGradient id="radial-gradient-price">
                <stop offset={1} stopColor="#00A7B3" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className="flow-root bg-white pb-24 sm:pb-32">
        <div className="-mt-80">
          <PricingCart redirectTo={true} />
        </div>
      </div>
    </div>
  );
}
