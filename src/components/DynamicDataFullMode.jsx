import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useDrupalData from "../services/api.jsx";
import TypeFilterButtons from "../components/TypeFilterButtons.jsx";
import CalendarFilter from "../components/CalendarFilter.jsx";

function FullModeComponent({ types, endpoint, renderFields }) {
    const navigate = useNavigate();
    const { alias } = useParams();
    const [typeInformation, setTypeInformation] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleTypeInformation = (type) => {
        setTypeInformation(type);
        navigate(`/${types}?category=${type}`);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        const formattedDate = date ? formatLongDate(null, date) : null;
        navigate(`/${types}?date=${formattedDate}`);
    };

    const formatLongDate = (locale, date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const { data, isLoading, error } = useDrupalData(`${types}/${alias}?_format=json`);
    return (
        <>
            <TypeFilterButtons handleTypeInformation={handleTypeInformation} />
            <CalendarFilter selectedDate={selectedDate} onDateChange={handleDateChange} />
            {renderFields(data)}
        </>
    );
}

export default FullModeComponent;
