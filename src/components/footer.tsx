"use client";

import Link from "next/link";
import Logo from "@/components/icons/logo-icon";

// const links: { name: string; path: string }[] = [
//   { name: "Routes", path: "/routes" },
//   { name: "Partnership", path: "/partnership" },
//   { name: "Contract", path: "/contract" },
//   { name: "Contact Us", path: "/contact-us" },
// ];

const Footer = () => {
    const date = new Date();

    return (
        <footer className="flex flex-shrink flex-col items-center gap-10 pb-4 bg-white">
            <div className="container mx-auto max-[350px]:px-2">
                <div className="flex gap-4 self-stretch pt-8 items-start justify-between max-sm:px-4 max-[440px]:grid max-[440px]:grid-cols-2 max-[440px]:gap-y-10">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-xl font-bold text-slate-700">About Us</h2>
                        <ul className="flex flex-col gap-2">
                            <li className="text-gray-500">
                                <Link href="/mission">Mission</Link>
                            </li>
                            <li className="text-gray-500">
                                <Link href="/who-we-are">Who we are</Link>
                            </li>
                            <li className="text-gray-500">
                                <Link href="/what-are-we-for">What are we for</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-4 max-[440px]:justify-self-center">
                        <h2 className="text-xl font-bold text-slate-700">Info</h2>
                        <ul className="flex flex-col gap-2">
                            <li className="text-gray-500">
                                <Link href="/routes">Routes</Link>
                            </li>
                            <li className="text-gray-500">
                                <Link href="/blog">Blog</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h2 className="text-xl font-bold text-slate-700">Conditions</h2>
                        <ul className="flex flex-col gap-2">
                            <li className="text-gray-500">
                                <Link href="/contract">Contract</Link>
                            </li>
                            <li className="text-gray-500">
                                <Link href="/rental-conditions">Rental Conditions</Link>
                            </li>
                            <li className="text-gray-500">
                                <Link href="/pay">Pay</Link>
                            </li>
                        </ul>
                    </div>
                    <ul className="flex flex-col items-start gap-4 max-md:hidden">
                        <li className="text-2xl font-bold text-[#3291ff]">
                            <Logo className="w-36" />
                        </li>
                    </ul>
                </div>
                <div className="mt-5 w-full">
                    <hr />
                    <p className="text-gray-500 text-center mt-3 mx-auto max-[440px]:text-sm">
                        © Copyright 2013 - {date.getFullYear()}. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
