import NewsBannerBlock from "../../blocks/NewsBannerBlock/NewsBannerBlock.jsx";
import TypeFilterButtons from "../../views/TypeFilterButtons/TypeFilterButtons.jsx";
import CalendarFilter from "../../views/Calendar/CalendarFilter.jsx";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import queryString from "query-string";

export default function News() {
    const navigate = useNavigate();

    // Parse the query parameters from the URL.np
    const search = window.location.search;
    const parsed = queryString.parse(search);

    // Extract date and category parameters or set defaults.
    const date = parsed.date;
    const category = parsed.category || 'All';

    const [typeInformation, setTypeInformation] = useState('All');
    const [selectedDate, setSelectedDate] = useState(null);

    // Function to format a date into a long format (YYYY-MM-DD).
    const formatLongDate = (locale, date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleTypeInformation = (type) => {
        setTypeInformation(type);
        navigate({
            // Update URL search parameters based on type and selected date.
            search: `?category=${type}${selectedDate ? `&date=${formatLongDate(null, selectedDate)}` : ''}`,
        });
    };

    return (
        <div className="news">
            <NewsBannerBlock/>
            <div className={"menu-dynamic-data-blocks"}>
                <h1 className={"subtitle"}>{(langPrefix === "en" && "All news") || ("Усі новини")}</h1>

                <div className={"menu-dynamic-data-blocks__left"}>
                    <TypeFilterButtons handleTypeInformation={handleTypeInformation}/>
                    <CalendarFilter selectedDate={selectedDate} onDateChange={handleDateChange}/>
                    <button className={"button-clear"} onClick={() => handleClear()}>
                        <span>{(langPrefix === 'en' && "Clear") || ("Очистити")}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
