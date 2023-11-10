import {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import useDrupalData from "../services/api.jsx";
import TypeFilterButtons from "../components/TypeFilterButtons.jsx";
import CalendarFilter from "../components/CalendarFilter.jsx";


function NewsFullMode() {
    const navigate = useNavigate();
    const { newsalias } = useParams();
    const [typeNews, setTypeNews] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [apiUrl, setApiUrl] = useState("jsonapi/views/news/block_1");


    const handleTypeNews = (type) => {
        setTypeNews(type);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const updateApiUrl = () => {
        let newApiUrl = `jsonapi/views/news/block_1`;

        if (typeNews) {
            newApiUrl += `?views-filter[type_news]=${typeNews}`;
        }

        if (selectedDate) {
            const formattedDate = formatLongDate(null, selectedDate);
            newApiUrl += `${typeNews ? '&' : '?'}views-filter[created]=${formattedDate}`;
        }

        return newApiUrl;
    };
    const formatLongDate = (locale, date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const { data: typeData, isLoading: typeIsLoading, error: typeError } = useDrupalData('jsonapi/taxonomy_term/type_information');
    const { data: newsNode, isLoading: newsNodeIsLoading, error: newsNodeError } = useDrupalData(`news/${newsalias}?_format=json`);
    useEffect(() => {
        const newApiUrl = updateApiUrl();
        setApiUrl(newApiUrl);
        // navigate(`/news`);
    }, [typeNews, selectedDate]);
    console.log(apiUrl)
    return (
        <>
            <TypeFilterButtons typeData={typeData} handleTypeNews={handleTypeNews} />
            <CalendarFilter selectedDate={selectedDate} onDateChange={handleDateChange} />
            {newsNode.title?.map((item, index) => (
                <div className="w-full" key={index}>
                    <p>title : {item.value}</p>
                </div>
            ))}
            {newsNode.field_description?.map((item, index) => (
                <div className="w-full" key={index}>
                    <p dangerouslySetInnerHTML={{ __html: `field_description: ${item.value}` }}></p>
                </div>
            ))}
        </>
    );
}

export default NewsFullMode;