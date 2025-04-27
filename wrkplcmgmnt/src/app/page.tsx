"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(""); // Clear previous error messages

    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const credentials = btoa(`${email}:${password}`); // Encode credentials in Base64
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log("User role:", result.role); // Debugging: Log the role
        console.log("User ID:", result.userId); // Debugging: Log the user ID
        localStorage.setItem("userRole", result.role || ""); // Save user role in Local Storage
        localStorage.setItem("userId", result.userId || ""); // Save user ID in Local Storage

        // Debugging: Verify Local Storage
        console.log(
          "Stored userId in Local Storage:",
          localStorage.getItem("userId")
        );
        router.push("/booking"); // Redirect to the booking page
      } else {
        const result = await response.json();
        setErrorMessage(result.message || "Authentication failed."); // Display error from the API
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again."); // Handle network or server errors
    }
  };

  return (
    <main className={styles.main}>
      <h1>Login to Workplace - Management Web-App</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
    </main>
  );
}
