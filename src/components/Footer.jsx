export default function Footer() {
  return (
    <div className="flex items-center  justify-center">
      {" "}
      <div
        className=" inset-x-0  -z-10 transform-gpu overflow-hidden blur-3xl"
        aria-hidden="true"
      >
        <div
          className=" relative left-[calc(50%-11rem)] assp
            w-[36.125rem] -translate-x-1/2 rotate-30 bg-gradient-to-tr
             from-[#594b92] to-[#11dffa] opacity-30 sm:left-[calc(50%-30rem)] 
             sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon( 32.5% 60.28%, 62.48% 52.48%, 68.18% 47.5%, 58.3% 45.2%, 34.5% 80.7%, 2% 72.5%, 27.5% 76.7%, 0.1% 64.98%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <h1 className="text-2xl absolute md:text-4xl font-serif ">
        This is a SAAS platform by{" "}
        <a
          href="https://github.com/cRED-f"
          className="text-indigo-600 font-mono cursor-pointer"
        >
          Md. Fahim Islam
        </a>
      </h1>{" "}
    </div>
  );
}
