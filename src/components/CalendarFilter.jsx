import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

function CalendarFilter({ selectedDate, onDateChange }) {
    const handleDateClick = (value) => {
        onDateChange(value);
    };

    const handleReset = () => {
        onDateChange(null);
    };

    return (
        <div>
            <Calendar
                onClickDay={handleDateClick}
                value={selectedDate}
            />
            <button className={'button-clear'} onClick={handleReset}>
                Clear
            </button>
        </div>
    );
}

export default CalendarFilter;
