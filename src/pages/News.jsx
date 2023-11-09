import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import useDrupalData from "../services/api.jsx";
import ImageComponent from "../components/ImageComponent.jsx";

function News() {

    const [selectedDate, setSelectedDate] = useState(null);
    const [type_news, setTypeNews] = useState(null);

    const formatLongDate = (locale, date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleDateClick = (value) => {
        setSelectedDate(value);
    };

    const handleReset = () => {
        setSelectedDate(null);
    };

    const handleTypeNews = (type) => {
        setTypeNews(type);
    };

    let apiUrl = `jsonapi/views/news/block_1`;

    if (type_news) {
        apiUrl += `?views-filter[type_news]=${type_news}`;
    }

    if (selectedDate) {
        const formattedDate = formatLongDate(null, selectedDate);
        apiUrl += `${type_news ? '&' : '?'}views-filter[created]=${formattedDate}`;
    }

    const { data: newsData, isLoading: newsIsLoading, error: newsError } = useDrupalData(apiUrl);
    const { data: typeData, isLoading: typeIsLoading, error: typeError } = useDrupalData('jsonapi/taxonomy_term/type_information');
    console.log(apiUrl)
    return (
        <div>
            <button onClick={() => handleTypeNews(null)}>Усі</button>

            {typeData?.data?.map((item, index) => (
                <div key={index}>
                    <button onClick={() => handleTypeNews(`${item.attributes.drupal_internal__tid}`)}>{item.attributes.name}</button>
                </div>
            ))}

            <Calendar
                formatLongDate={formatLongDate}
                onClickDay={handleDateClick}
            />
            <button className={'button-clear'} onClick={handleReset}>Clear</button>
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
