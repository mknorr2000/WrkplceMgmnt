// src/app/page.tsx

import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>Welcome to Workplace - Management Web-App!</h1>
      <p>Here u can book a  work or parking space </p>
      <nav>
        <ul>
          <li>
            <Link href="/booking">To Bookings</Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}
