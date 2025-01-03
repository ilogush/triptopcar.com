"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { usePathname } from "next/navigation";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    const isAdminPage = pathname?.startsWith("/admin");

    return (
        <>
            {!isAdminPage && <Header />}
            {children}
            {!isAdminPage && <Footer />}
        </>
    );
};

export default ClientLayout;
