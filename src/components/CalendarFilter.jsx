import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

function CalendarFilter({ selectedDate, onDateChange }) {
    const handleDateClick = (value) => {
        onDateChange(value);
    };

    return (
        <div>
            <Calendar
                onClickDay={onDateChange}
                value={selectedDate}
            />
            <button onClick={() => handleDateClick(null)}>
                Clear
            </button>
        </div>
    );
}

export default CalendarFilter;
