"use client"; // Если используешь Next.js App Router

import React, { useState } from "react";
import styles from "./MasterPage.module.css";

export default function Admin() {
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [password, setPassword] = useState(""); // Пока не используется в API, но можно расширить
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateUser = async () => {
    setLoading(true);
    setMessage("");

    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, department }), // role не передаем, оно "user" по умолчанию
    });

    const data = await response.json();
    setLoading(false);

    if (response.ok) {
      setMessage(`✅ Пользователь создан: ID ${data.id}`);
      setEmail("");
      setDepartment("");
      setPassword("");
    } else {
      setMessage(`❌ Ошибка: ${data.error}`);
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>Admin Page</h1>
      <p className={styles.description}>Hier Admins do their Stuff.</p>

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
          placeholder="Departement"
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
          <h3>{loading ? "Creating..." : "Create a User"}</h3>
        </div>
      </div>

      {message && <p className={styles.message}>{message}</p>}
    </main>
  );
}
