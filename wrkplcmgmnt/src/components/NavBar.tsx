// src/components/NavBar.tsx
import Link from 'next/link';
import './NavBar.css'; // Importiere die CSS-Datei für die Navigation

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <Link href="/booking">Home</Link>
        </li>        
        <li>
          <Link href="/mybookings">My Bookings</Link>
        </li>
        <li>
          <Link href="/admin">Admin</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
