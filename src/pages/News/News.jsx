import NewsBannerBlock from "../../blocks/NewsBannerBlock/NewsBannerBlock.jsx";
import TypeFilterButtons from "../../views/TypeFilterButtons/TypeFilterButtons.jsx";
import CalendarFilter from "../../views/Calendar/CalendarFilter.jsx";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import {format} from "date-fns";
import {uk} from "date-fns/locale";
import queryString from "query-string";
import {useNewsViewBlockQuery} from '../../services/api.js';
import useLanguagePrefix from "../../services/languagePrefix.jsx";
import './News.scss';
import MetaTags from "../../components/Common/MetaTags.jsx";

export default function News() {
    const navigate = useNavigate();

    const search = window.location.search;
    const parsed = queryString.parse(search);
    const langPrefix = useLanguagePrefix();

    const location = useLocation();
    const currentPath = location.pathname;

    // Extract date and category parameters or set defaults.
    const date = parsed.date;
    const category = parsed.category || 'All';

    const [typeInformation, setTypeInformation] = useState('All');
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

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
    const handleDateChange = (date) => {
        setSelectedDate(date);
        const formattedDate = date ? formatLongDate(null, date) : null;
        navigate({
            search: `?${typeInformation ? `category=${typeInformation}&` : ''}date=${formattedDate}`,
        });
    };

    const handleClear = () => {
        setTypeInformation(null);
        setSelectedDate(null);

        navigate({
            search: '',
        });
    };

    const {data} = useNewsViewBlockQuery({currentPage: `${currentPage}`, category: `${category}`, date: `${date}`});

    return (
        <>
            <MetaTags type={"view"} data={data} viewUrl={currentPath}/>
            <div className="news container">
                <NewsBannerBlock/>
                <div className="menu-dynamic-data-blocks">
                    <h1 className="subtitle">{(langPrefix === "en" && "All news") || ("Усі новини")}</h1>
                    <div className="menu-dynamic-data-blocks__left">
                        <TypeFilterButtons handleTypeInformation={handleTypeInformation}/>
                        <CalendarFilter selectedDate={selectedDate} onDateChange={handleDateChange}/>
                        <button className="button-clear" onClick={() => handleClear()}>
                            <span>{(langPrefix === 'en' && "Clear") || ("Очистити")}</span>
                        </button>
                    </div>
                </div>

                <div className={"dynamic-data-blocks view-content"}>
                    {data?.data?.length ? (
                        <>
                            {data?.data?.map((item, index) => (
                                <div className="news-card" key={index}>
                                    <div className="news-card-top">
                                        <img src={item?.field_image?.image_style_uri?.['newsblockcard']}
                                             alt={item?.field_image?.meta?.alt}/>
                                    </div>
                                    <div className="news-card-bottom">
                                        {langPrefix === 'uk' && <div
                                            className={"date_field"}>{format(new Date(item?.created), 'dd MMMM HH:mm', {locale: uk})}</div>}
                                        {langPrefix === 'en' && <div
                                            className={"date_field"}>{format(new Date(item?.created), 'dd MMMM HH:mm')}</div>}
                                        <Link className="teaser_title"
                                              to={`/${langPrefix}${item?.path?.alias}`}>{item.title}</Link>
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <div className="empty-dynamic-container"><h1>No news found with the selected
                            filters.</h1></div>
                    )}
                </div>
            </div>
        </>
    );
}
