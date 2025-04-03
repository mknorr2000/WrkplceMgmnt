"use client";
import React, { useState, useEffect } from "react";
import styles from "./BookParkplacePage.module.css";
import dynamic from "next/dynamic";
import "react-datepicker/dist/react-datepicker.css";

// Dynamically import DatePicker to avoid SSR issues
const DatePicker = dynamic<any>(
  () => import("react-datepicker").then((mod) => mod.default),
  { ssr: false }
);

// Utility function for API calls
const fetchData = async (url: string, options?: RequestInit) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText} - ${errorText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

const ParkplaceBookingPage = () => {
  const [selectedParkplace, setSelectedParkplace] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [bookedParkplaces, setBookedParkplaces] = useState<number[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Fetch booked parking spots on component mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fetch booked parking spots for the selected date
  useEffect(() => {
    if (!selectedDate) return;

    const fetchBookedParkplaces = async () => {
      const date = selectedDate.toISOString().split("T")[0];
      try {
        const data = await fetchData(`/api/parkplaces/booked?date=${date}`);
        console.log(`Booked parking spots for ${date}:`, data); // Log API response
        setBookedParkplaces(data);
      } catch (error) {
        console.error("Failed to load booked parking spots:", error); // Log error
        alert("Failed to load booked parking spots.");
      }
    };

    fetchBookedParkplaces();
  }, [selectedDate]);

  // Handle parking spot selection
  const handleParkplaceClick = (parkplace: number) => {
    if (!selectedDate) {
      alert("Please select a date first.");
      return;
    }
    if (!bookedParkplaces.includes(parkplace)) {
      setSelectedParkplace((prev) => (prev === parkplace ? null : parkplace));
    }
  };

  // Handle booking submission
  const handleBooking = async () => {
    if (!selectedParkplace || !selectedDate) {
      alert("Please select a parking spot and date.");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to midnight for comparison
    if (selectedDate < today) {
      alert("You cannot select a date in the past.");
      return;
    }

    const reservation_date = selectedDate.toISOString().split("T")[0];
    const url = `/api/parkplaces/${selectedParkplace}/bookings`;

    try {
      const response = await fetchData(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reservation_date }),
      });
      console.log("Booking response:", response); // Log API response
      alert(`Booking successful for parking spot P${selectedParkplace} on ${reservation_date}.`);
      setBookedParkplaces((prev) => {
        const updated = [...prev, selectedParkplace];
        console.log("Updated bookedParkplaces state:", updated); // Log updated state
        return updated;
      });
      setSelectedParkplace(null);
      setSelectedDate(null);
    } catch (error) {
      console.error("Failed to book parking spot:", error); // Log error
      alert("Failed to book parking spot. Please try again.");
    }
  };

  // Get CSS class for a parking spot
  const getParkplaceClass = (parkplace: number) => {
    if (bookedParkplaces.includes(parkplace)) return styles.booked;
    if (selectedParkplace === parkplace) return styles.clicked;
    return styles.available; // Add class for available spots
  };

  // Render parking spots
  const renderParkplaces = (startId: number, count: number, className: string) =>
    Array.from({ length: count }, (_, index) => {
      const parkplaceId = startId + index;
      return (
        <div
          key={parkplaceId}
          className={`${className} ${getParkplaceClass(parkplaceId)}`}
          onClick={() => handleParkplaceClick(parkplaceId)}
        >
          P{parkplaceId}
        </div>
      );
    });

  return (
    <div className={styles["plan-container"]}>
      <h1>Book a Parking Spot</h1>

      {/* Date Picker */}
      <div className={styles["date-picker-container"]}>
        <label htmlFor="date-picker">Select a Date:</label>
        {isClient && (
          <DatePicker
            id="date-picker"
            selected={selectedDate}
            onChange={(date: Date) => setSelectedDate(date)}
            className={styles["date-picker"]}
            dateFormat="yyyy-MM-dd"
            minDate={new Date()} // Prevent selecting past dates
          />
        )}
      </div>

      {/* Parking Layout */}
      <div className={styles["office-building"]}>
        <div className={styles["parkplaces-column"]}>
          {renderParkplaces(11, 6, styles["rightParking"])}
        </div>
        <h1>Office Building</h1>
      </div>
      <div className={styles["parkplaces-container"]}>
        <div className={styles["center-parkplace"]}>
          {[...Array(2)].map((_, rowIndex) => (
            <div key={`row-${rowIndex}`} className={styles["parkplaces-row"]}>
              {renderParkplaces(rowIndex * 5 + 1, 5, styles["frontParking"])}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className={styles["legend"]}>
        <div className={styles["legend-text"]}>
          <span className={styles["legend-box"]} style={{ backgroundColor: "red" }}></span> - Booked
        </div>
        <div className={styles["legend-text"]}>
          <span className={styles["legend-box"]} style={{ backgroundColor: "green" }}></span> - Available
        </div>
        <div className={styles["legend-text"]}>
          <span className={styles["legend-box"]} style={{ backgroundColor: "#009999" }}></span> - Selected
        </div>
      </div>

      {/* Booking Button */}
      <button
        className={styles["book-button"]}
        onClick={handleBooking}
        disabled={!selectedParkplace || !selectedDate}
      >
        Book Parking Spot
      </button>
    </div>
  );
};

export default ParkplaceBookingPage;