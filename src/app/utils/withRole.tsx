"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: number;
  name: string;
  role: string;
}

export const withRole = (WrappedComponent: any, allowedRole: string) => {
  return function ProtectedComponent(props: any) {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/admin"); // Перенаправляем на логин, если токен отсутствует
        return;
      }

      try {
        const decoded: DecodedToken = jwtDecode(token);

        if (decoded.role !== allowedRole) {
          router.push("/admin"); // Перенаправляем, если роль не совпадает
        }
      } catch (err) {
        console.error(err);
        router.push("/admin"); // Перенаправляем при ошибке
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
};
