"use client";

import { withRole } from "@/app/utils/withRole";
import { useState } from "react";

function RegisterUserPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("manager"); // Роль по умолчанию
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/admin/owner/dashboard/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }

      setMessage("User created successfully");
      setEmail("");
      setPassword("");
      setRole("manager");
    } catch (error) {
      console.error(error);
      console.log(error);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "2rem" }}>
      <h2>Register New User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem", margin: "0.5rem 0" }}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem", margin: "0.5rem 0" }}
          />
        </div>
        <div>
          <label>Role:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ width: "100%", padding: "0.5rem", margin: "0.5rem 0" }}
          >
            <option value="manager">Manager</option>
            <option value="owner">Owner</option>
          </select>
        </div>
        <button type="submit" style={{ marginTop: "1rem" }}>
          Register User
        </button>
      </form>
      {message && <p style={{ color: "red", marginTop: "1rem" }}>{message}</p>}
    </div>
  );
}


export default withRole(RegisterUserPage, "owner");