"use client";

import { usePathname } from "next/navigation";
import { FC } from "react";
import { TELEGRAM_LINK, WHATSAPP_LINK } from "@/lib/config";
import TelegramIcon from "./icons/telegram-icon";
import WhatsAppIcon from "./icons/whats-app-icon";
import Link from "next/link";
import Breadcrumbs from "./breadcrumbs";
import Logo2 from "@/components/icons/logo2-icon";

const links: { name: string; path: string }[] = [
  { name: "Routes", path: "/routes" },
  { name: "Partnership", path: "/partnership" },
  { name: "Contract", path: "/contract" },
];

const breadCrumbsPaths = ["/booking", "/checkout"];

const Header: FC = () => {
  const pathname = usePathname();
  const isBookingPage = pathname.startsWith("/booking");

  return (
    <header className={`bg-brand-base px-8 py-4 ${isBookingPage ? "pb-[3rem]" : "pb-20"} max-sm:px-2`}>
      {" "}
      <div className="container mx-auto flex items-end justify-between max-md:w-full">
        <div className="flex gap-10 items-end">
          <Link href="/" className="font-semibold text-white">
            <Logo2 className="w-32" />
          </Link>
          {breadCrumbsPaths.some((breadcrumb) => pathname.includes(breadcrumb)) ? (
            <Breadcrumbs pathname={pathname} className="max-lg:hidden" />
          ) : (
            <nav className="flex items-center justify-between">
              <ul className="flex flex-col items-center justify-center gap-8 sm:flex-row max-md:hidden">
                {links.map((link, index) => (
                  <li key={index}>
                    <Link href={link.path} className="font-semibold text-white">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
        <div className="flex flex-row items-center gap-8">
          <Link href={TELEGRAM_LINK} target="_blank">
            <TelegramIcon className="h-6 w-6 text-white" />
          </Link>
          <Link href={WHATSAPP_LINK} target="_blank">
            <WhatsAppIcon className="h-6 w-6 text-white" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
