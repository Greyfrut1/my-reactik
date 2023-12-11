// Import necessary dependencies for the CalendarFilter component.
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import PropTypes from "prop-types";
import useLanguagePrefix from "../services/languagePrefix.jsx";

// Define the CalendarFilter component that takes selectedDate and onDateChange as props.
function CalendarFilter({ selectedDate, onDateChange }) {
    // Define a function handleDateClick to handle the click event on a calendar day.
    const handleDateClick = (value) => {
        // Call the onDateChange prop with the selected date value when a day is clicked.
        onDateChange(value);
    };

    const langPrefix = useLanguagePrefix();

    // Render the CalendarFilter component with a Calendar component and a Clear button.
    return (
        <div className={"flex justify-center"}>
            <div>
                {/* Render the Calendar component with onClickDay to handle day clicks and value for the selected date. */}
                <Calendar
                    onClickDay={onDateChange}
                    value={selectedDate}
                    locale={langPrefix}
                />
                {/* Render a Clear button with an onClick event to reset the selected date to null. */}
                    <button className={"calendar-button-clear w-full"} onClick={() => handleDateClick(null)}>
                        <span>{(langPrefix === 'en' && "Clear") || ("Очистити")}</span>
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
