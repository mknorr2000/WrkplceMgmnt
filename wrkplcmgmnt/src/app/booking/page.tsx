
import React from 'react';
import Link from 'next/link';


const BookingPage = () => {
    return (
        <main>
        <h1>Welcome to Workplace - Management Web-App!</h1>
        <p>Here u can book a  work or parking space </p>
        <nav>
          <ul>
            <li>
              <Link href="/booking/workplace">Workplace Booking</Link>
            </li>
            <li>
              <Link href="/booking/parkplace">Parkplace Booking</Link>
            </li>
          </ul>
        </nav>
      </main>
      );
};

export default BookingPage;
