"use client";

import React, { useState } from "react";
import styles from "./MasterPage.module.css";

export default function Admin() {
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false); // Steuert das Popup

  const handleCreateUser = async () => {
    setError(null);
    setSuccess(false);

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, department, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error creating user");
      }

      setSuccess(true);
      setEmail("");
      setDepartment("");
      setPassword("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>Admin Page</h1>
      <p className={styles.description}>Here admins manage users.</p>

      <div className={styles.textwrite}>
        <input
          className={styles.text}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={styles.text}
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <input
          className={styles.text}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={styles.button} onClick={handleCreateUser}>
          <h3>Create a User</h3>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        {/* ✅ Modal Popup */}
        {success && (
          <div className={styles.popup}>
            <div className={styles.popupContent}>
              <h3>User successfully created!</h3>
              <button onClick={() => setSuccess(false)}>OK</button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
