"use client";
import React, { useEffect, useState } from "react";
import styles from "./OverviewPage.module.css";

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      const userId = localStorage.getItem("userId"); // Dynamically fetch user_id
      console.log("Retrieved userId from Local Storage:", userId); // Debugging

      if (!userId) {
        setError("User ID not found. Please log in again.");
        return;
      }

      try {
        const response = await fetch(`/api/reservations?user_id=${userId}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched bookings:", data); // Debugging: Log fetched data

        // Filter out invalid bookings
        const validBookings = data.filter(
          (booking) =>
            booking.reservation_date &&
            (booking.seat_id !== null || booking.parkplace_id !== null)
        );

        setBookings(validBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Failed to load bookings. Please try again later.");
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h1>My Bookings</h1>
      {error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <ul className={styles.bookingList}>
          {bookings.slice(0, 5).map((booking, index) => (
            <li key={index} className={styles.bookingItem}>
              <h3>
                {booking.seat_id !== null
                  ? `Workplace ${booking.seat_id}`
                  : `Parkplace ${booking.parkplace_id}`}
              </h3>
              <p>
                Date:{" "}
                {booking.reservation_date
                  ? new Date(booking.reservation_date).toLocaleDateString(
                      "en-GB"
                    ) // Use consistent locale
                  : "Invalid Date"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBookingsPage;
