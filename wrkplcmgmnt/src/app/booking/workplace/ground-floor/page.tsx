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

// Utility function for API calls
const fetchData = async (url: string, options?: RequestInit) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText} - ${errorText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

const GroundFloorPage = () => {
  const [selectedWorkplace, setSelectedWorkplace] = useState<number | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [bookedWorkplaces, setBookedWorkplaces] = useState<number[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Fetch booked workplaces on component mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fetch booked workplaces for the selected date
  useEffect(() => {
    if (!selectedDate) return;

    const fetchBookedWorkplaces = async () => {
      const date = selectedDate.toISOString().split("T")[0];
      try {
        const data = await fetchData(`/api/workplace/booked?date=${date}`);
        setBookedWorkplaces(data);
      } catch (error) {
        console.error("Failed to load booked workplaces:", error);
        alert("Failed to load booked workplaces.");
      }
    };

    fetchBookedWorkplaces();
  }, [selectedDate]);

  // Handle workplace selection
  const handleWorkplaceClick = (workplace: number) => {
    if (!selectedDate) {
      alert("Please select a date first.");
      return;
    }
    setSelectedWorkplace((prev) => (prev === workplace ? null : workplace));
  };

  // Handle booking submission
  const handleBooking = async () => {
    if (!selectedWorkplace || !selectedDate) {
      alert("Please select a workplace and date.");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to midnight for comparison
    if (selectedDate < today) {
      alert("You cannot select a date in the past.");
      return;
    }

    const reservation_date = selectedDate.toISOString().split("T")[0];
    const url = `/api/workplace/${selectedWorkplace}/bookings`;

    try {
      await fetchData(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reservation_date }),
      });

      alert(
        `Booking successful for workplace W${selectedWorkplace} on ${reservation_date}.`
      );
      setBookedWorkplaces((prev) => [...prev, selectedWorkplace]);
      setSelectedWorkplace(null);
    } catch (error) {
      console.error("Failed to book workplace:", error);
      alert("Failed to book workplace. Please try again.");
    }
  };

  // Get CSS class for a workplace
  const getWorkplaceClass = (workplace: number) => {
    if (selectedWorkplace === workplace) {
      console.log(`Workplace ${workplace} is selected (clicked)`); // Debugging
      return styles.clicked; // Turquoise for selected
    }
    if (bookedWorkplaces.includes(workplace)) {
      console.log(`Workplace ${workplace} is booked`); // Debugging
      return styles.booked; // Red for booked
    }
    console.log(`Workplace ${workplace} is available`); // Debugging
    return styles.available; // Green for available
  };

  // Render workplaces
  const renderWorkplaces = (
    startId: number,
    count: number,
    className: string
  ) =>
    Array.from({ length: count }, (_, index) => {
      const workplaceId = startId + index;
      return (
        <div
          key={workplaceId}
          className={`${className} ${getWorkplaceClass(workplaceId)}`}
          onClick={() => handleWorkplaceClick(workplaceId)}
        >
          W{workplaceId}
        </div>
      );
    });

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

      {/* Workplace Layout */}
      <div className={styles["workplace-container"]}>
        <div className={styles["second-room"]}>
          {renderWorkplaces(9, 4, styles["workplace"])}
        </div>
        <div className={styles["block-room"]}>
          <div className={styles["main-room"]}>
            <div className={styles["group-up"]}>
              {renderWorkplaces(1, 4, styles["workplace"])}
            </div>
            <div className={styles["group-down"]}>
              {renderWorkplaces(5, 4, styles["workplace"])}
            </div>
          </div>
          <div className={styles["third-room"]}>
            {renderWorkplaces(13, 4, styles["workplace"])}
          </div>
        </div>
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

      {/* Booking Button */}
      <button
        className={styles["book-button"]}
        onClick={handleBooking}
        disabled={!selectedWorkplace || !selectedDate}
      >
        Book Workplace
      </button>
    </div>
  );
};

export default GroundFloorPage;
