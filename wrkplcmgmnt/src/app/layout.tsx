// src/app/layout.tsx
"use client";

import { usePathname } from "next/navigation"; // Import usePathname hook
import NavBar from "../components/NavBar"; // Import NavBar component
import "./globals.css"; // Import global styles

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname(); // Get the current route

    // Define the routes where the NavBar should NOT be displayed
    const hideNavBarRoutes = ["/"]; // Only hide NavBar on the login page

    // Check if the current route is in the list
    const showNavBar = !hideNavBarRoutes.includes(pathname);

    return (
        <html lang="de">
            <body className="antialiased">
                {/* Render NavBar only if the route is not in the hideNavBarRoutes */}
                {showNavBar && <NavBar />}
                {children}
            </body>
        </html>
    );
}
