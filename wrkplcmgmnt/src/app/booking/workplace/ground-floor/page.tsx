"use client";
import React, { useState, useEffect } from "react";
import styles from "./GroundFloorPage.module.css";
import dynamic from "next/dynamic";
import "react-datepicker/dist/react-datepicker.css";

// Dynamically import DatePicker to avoid SSR issues
const DatePicker = dynamic<any>(
  () => import("react-datepicker").then((mod) => mod.default),
  { ssr: false }
);

const GroundFloorPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedWorkplace, setSelectedWorkplace] = useState<number | null>(
    null
  );
  const [bookedWorkplaces, setBookedWorkplaces] = useState<number[]>([]);
  const [workplaces, setWorkplaces] = useState<
    { id: number; seat_number: string }[]
  >([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Fetch all workplaces from the API
    const fetchWorkplaces = async () => {
      try {
        const response = await fetch("/api/workplace");
        if (response.ok) {
          const data = await response.json();
          setWorkplaces(data);
        } else {
          console.error("Failed to fetch workplaces.");
        }
      } catch (error) {
        console.error("Error fetching workplaces:", error);
      }
    };

    fetchWorkplaces();
  }, []);

  const handleWorkplaceClick = (workplaceId: number) => {
    if (bookedWorkplaces.includes(workplaceId)) return;
    setSelectedWorkplace(
      workplaceId === selectedWorkplace ? null : workplaceId
    );
  };

  const handleBooking = async () => {
    if (!selectedDate || !selectedWorkplace) {
      alert("Please select a date and a workplace before booking.");
      return;
    }

    try {
      const response = await fetch(
        `/api/workplace/${selectedWorkplace}/bookings`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            reservations_date: selectedDate.toISOString().split("T")[0], // Format date as yyyy-MM-dd
          }),
        }
      );

      if (response.ok) {
        alert("Workplace booked successfully!");
        setBookedWorkplaces((prev) => [...prev, selectedWorkplace]);
        setSelectedWorkplace(null);
      } else {
        alert("Failed to book workplace.");
      }
    } catch (error) {
      console.error("Error booking workplace:", error);
      alert("An error occurred while booking.");
    }
  };

  return (
    <div className={styles["plan-container"]}>
      <h1>Book a Workplace</h1>

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

      {/* Room Container */}
      <div className={styles["room-container"]}>
        {workplaces.map((workplace) => (
          <div
            key={workplace.id}
            className={`${styles["workplace"]} ${
              bookedWorkplaces.includes(workplace.id)
                ? styles["booked"]
                : workplace.id === selectedWorkplace
                ? styles["selected"]
                : styles["available"]
            }`}
            onClick={() => handleWorkplaceClick(workplace.id)}
          >
            {workplace.seat_number}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className={styles["legend"]}>
        <div className={styles["legend-text"]}>
          <span
            className={styles["legend-box"]}
            style={{ backgroundColor: "red" }}
          ></span>{" "}
          - Booked
        </div>
        <div className={styles["legend-text"]}>
          <span
            className={styles["legend-box"]}
            style={{ backgroundColor: "green" }}
          ></span>{" "}
          - Available
        </div>
        <div className={styles["legend-text"]}>
          <span
            className={styles["legend-box"]}
            style={{ backgroundColor: "#009999" }}
          ></span>{" "}
          - Selected
        </div>
      </div>

      {/* Book Workplace Button */}
      <button
        className={styles["book-button"]}
        onClick={handleBooking}
        disabled={!selectedDate || !selectedWorkplace}
      >
        Book Workplace
      </button>
    </div>
  );
};

export default GroundFloorPage;
