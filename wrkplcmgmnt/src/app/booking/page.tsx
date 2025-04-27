import React from "react";
import Link from "next/link";
import styles from "./HomePage.module.css";
import Image from "next/image";

const BookingPage = () => {
  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>
        Welcome to Workplace - Management Web-App!
      </h1>
      <p className={styles.description}>
        Here you can easily book a work or parking space.
      </p>
      <div className={styles.symbols}>
        <Image
          src="/images/workplaceSymbol.png"
          alt="Workplace"
          width={200}
          height={200}
        />
        <Image
          src="/images/parkplaceSymbol.png"
          alt="Parkplace"
          width={200}
          height={200}
        />
        <Image
          src="/images/overview.png"
          alt="BookOverview"
          width={200}
          height={200}
        />
      </div>
      <div className={styles.splitContainer}>
        <a href="/booking/workplace" className={styles.link}>
          <div className={styles.bookingSection}>
            <h2>Workplace Booking</h2>
          </div>
        </a>
        <a href="/booking/parkplace" className={styles.link}>
          <div className={styles.bookingSection}>
            <h2>Parkplace Booking</h2>
          </div>
        </a>
        <a href="/mybookings" className={styles.link}>
          <div className={styles.bookingSection}>
            <h2>My Bookings</h2>
          </div>
        </a>
      </div>
    </main>
  );
};

export default BookingPage;
