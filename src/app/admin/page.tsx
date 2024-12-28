"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("manager");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/admin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password, role }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const { token } = await response.json();
      localStorage.setItem("token", token);
      setMessage("Login successful!");

      // Редирект на вкладки, доступные для менеджера
      if (role === "manager") {
        router.push("/admin/manager/dashboard/contracts");
      } else if (role === "owner") {
        router.push("/admin/owner/dashboard/cars");
      }
    } catch (err) {
      console.log(err);
      setMessage("Login failed, please check your credentials.");
    }
  };

  return (
    <div
      style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Login</h1>
      <form
        onSubmit={handleLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            width: "300px",
            padding: "0.5rem",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "300px",
            padding: "0.5rem",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{
            width: "300px",
            padding: "0.5rem",
            borderRadius: "5px",
            border: "1px solid #007BFF",
            backgroundColor: "#F9F9F9",
            color: "#333",
            fontSize: "1rem",
            appearance: "none",
            cursor: "pointer",
          }}
        >
          <option value="manager">Manager</option>
          <option value="owner">Owner</option>
        </select>

        <button
          type="submit"
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "5px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
      {message && (
        <p style={{ marginTop: "1rem", color: message === "Login successful!" ? "green" : "red" }}>
          {message}
        </p>
      )}
    </div>
  );
}
