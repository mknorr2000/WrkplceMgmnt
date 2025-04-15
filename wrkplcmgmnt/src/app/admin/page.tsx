"use client";

import React, { useState, useEffect } from "react";
import styles from "./MasterPage.module.css";

export default function Admin() {
    // State variables for form inputs and UI feedback
    const [email, setEmail] = useState("");
    const [department, setDepartment] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false); // Controls the success popup
    const [authorized, setAuthorized] = useState(false); // Authorization state

    // Check if the user is authorized to access the admin page
    useEffect(() => {
        fetch("/api/role", { credentials: "include" }) // Ensure cookies are sent
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch role");
                }
                return res.json();
            })
            .then((data) => {
                if (data?.role === "master") {
                    setAuthorized(true);
                } else {
                    window.location.href = "/"; // Redirect to the home page
                }
            })
            .catch(() => {
                window.location.href = "/"; // Redirect on error
            });
    }, []);

    // Show nothing until authorization is verified
    if (!authorized) {
        return null;
    }

    // Handle user creation
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
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, department, password }),
            });

            const data = await response.json();

            if (!response.ok || !data) {
                throw new Error(data?.error || "Error creating user");
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
                {/* Input for email */}
                <input
                    className={styles.text}
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {/* Input for department */}
                <input
                    className={styles.text}
                    type="text"
                    placeholder="Department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                />

                {/* Input for password */}
                <input
                    className={styles.text}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {/* Button to create a user */}
                <div className={styles.button} onClick={handleCreateUser}>
                    <h3>Create a User</h3>
                </div>

                {/* Error message */}
                {error && <p className={styles.error}>{error}</p>}

                {/* Success popup */}
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
