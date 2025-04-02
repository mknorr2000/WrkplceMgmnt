"use client"

import Link from 'next/link';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <main>
      <h1>Welcome to Workplace - Management Web-App!</h1>
      <p>Here u can book a work or parking space</p>
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
