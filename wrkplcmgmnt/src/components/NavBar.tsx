"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import "./NavBar.css";

const NavBar = () => {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    console.log("Retrieved user role:", role); // Debugging: Log the role
    setUserRole(role || "");
  }, []);

  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <Link href="/booking" className="nav-item">
            <Image
              src="/images/NavHome.png"
              alt="Home Icon"
              className="nav-icon"
              width={24}
              height={24}
            />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link href="/mybookings" className="nav-item">
            <Image
              src="/images/NavOverview.png"
              alt="Overview Icon"
              className="nav-icon"
              width={24}
              height={24}
            />
            <span>My Bookings</span>
          </Link>
        </li>
        {userRole === "master" && (
          <li>
            <Link href="/admin" className="nav-item">
              <Image
                src="/images/NavAdmin.png"
                alt="Admin Icon"
                className="nav-icon"
                width={24}
                height={24}
              />
              <span>Admin</span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
