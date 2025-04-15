import Link from 'next/link';
import Image from 'next/image';
import './NavBar.css';

const NavBar = () => {
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
      </ul>
    </nav>
  );
};

export default NavBar;