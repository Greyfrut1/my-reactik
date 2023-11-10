import { useEffect, useState } from "react";
import 'react-calendar/dist/Calendar.css';
import useDrupalData from "../services/api.jsx";
import ImageComponent from "../components/ImageComponent.jsx";
import CalendarFilter from "../components/CalendarFilter.jsx";
import TypeFilterButtons from "../components/TypeFilterButtons.jsx";

function News() {
    const [typeNews, setTypeNews] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [apiUrl, setApiUrl] = useState("jsonapi/views/news/block_1");

    useEffect(() => {
        updateApiUrl();
    }, [typeNews, selectedDate]);

    const updateApiUrl = () => {
        let newApiUrl = "jsonapi/views/news/block_1";

        if (typeNews) {
            newApiUrl += `?views-filter[type_news]=${typeNews}`;
        }

        if (selectedDate) {
            const formattedDate = formatLongDate(null, selectedDate);
            newApiUrl += `${typeNews ? '&' : '?'}views-filter[created]=${formattedDate}`;
        }

        setApiUrl(newApiUrl);
    };

    const formatLongDate = (locale, date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleTypeNews = (type) => {
        setTypeNews(type);
    };

    const { data: newsData} = useDrupalData(apiUrl);
    const { data: typeData} = useDrupalData('jsonapi/taxonomy_term/type_information');

    return (
        <div>
            <TypeFilterButtons typeData={typeData} handleTypeNews={handleTypeNews} />
            <CalendarFilter selectedDate={selectedDate} onDateChange={setSelectedDate} />
            {newsData?.data?.map((item, index) => (
                <div key={index}>
                    <a href={item?.attributes?.path?.alias}>{item.attributes.title}</a>
                    {item.relationships.field_image && (
                        <ImageComponent url={new URL(item.relationships.field_image.links.related.href).pathname} imagestyle="large" />
                    )}
                    <p>{item?.attributes?.field_description?.summary}</p>
                </div>
            ))}
        </div>
    );
}

export default News;
