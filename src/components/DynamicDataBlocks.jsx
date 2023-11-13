import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useDrupalData from "../services/api.jsx";
import CalendarFilter from "../components/CalendarFilter.jsx";
import TypeFilterButtons from "../components/TypeFilterButtons.jsx";
import queryString from 'query-string';

function DynamicDataBlocks({ type, endpoint, render }) {
    const navigate = useNavigate();
    const search = window.location.search;
    const parsed = queryString.parse(search);
    const date = parsed.date;
    const category = parsed.category || 'All';
    const [typeInformation, setTypeInformation] = useState('All');
    const [selectedDate, setSelectedDate] = useState(null);

    const formatLongDate = (locale, date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleTypeInformation = (type) => {
        setTypeInformation(type);
        navigate({
            search: `?category=${type}${selectedDate ? `&date=${formatLongDate(null, selectedDate)}` : ''}`,
        });
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        const formattedDate = date ? formatLongDate(null, date) : null;
        navigate({
            search: `?${typeInformation ? `category=${typeInformation}&` : ''}date=${formattedDate}`,
        });
    };

    const { data } = useDrupalData(endpoint(date, category));

    return (
        <div>
            <TypeFilterButtons handleTypeInformation={handleTypeInformation} />
            <CalendarFilter selectedDate={selectedDate} onDateChange={handleDateChange} />
            {data?.data?.map((item, index) => render(item, index))}
        </div>
    );
}

export default DynamicDataBlocks;
