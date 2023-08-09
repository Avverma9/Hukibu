import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from  "./Calender.module.css"

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className={styles.calendarContainer}>
      <h2>Calendar</h2>
      <div className={styles.calendarWrapper}>
        <Calendar value={selectedDate} onChange={handleDateChange} />
      </div>
    </div>
  );
};

export default MyCalendar;
