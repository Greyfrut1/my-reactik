// Import necessary dependencies for the CalendarFilter component.
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import PropTypes from "prop-types";

// Define the CalendarFilter component that takes selectedDate and onDateChange as props.
function CalendarFilter({ selectedDate, onDateChange }) {
    // Define a function handleDateClick to handle the click event on a calendar day.
    const handleDateClick = (value) => {
        // Call the onDateChange prop with the selected date value when a day is clicked.
        onDateChange(value);
    };

    // Render the CalendarFilter component with a Calendar component and a Clear button.
    return (
        <div className={"flex justify-center"}>
            <div>
                {/* Render the Calendar component with onClickDay to handle day clicks and value for the selected date. */}
                <Calendar
                    onClickDay={onDateChange}
                    value={selectedDate}
                />
                {/* Render a Clear button with an onClick event to reset the selected date to null. */}
                <button onClick={() => handleDateClick(null)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

// PropTypes block to define the expected types for props
CalendarFilter.propTypes = {
    selectedDate: PropTypes.instanceOf(Date),
    onDateChange: PropTypes.func.isRequired,
};

// Export the CalendarFilter component for use in other parts of the application.
export default CalendarFilter;
