import {useContext, useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import {useDynamicPageQuery} from "../../services/api.js";
import TypeFilterButtons from "../TypeFilterButtons/TypeFilterButtons.jsx";
import CalendarFilter from "../Calendar/CalendarFilter.jsx";
import DynamicDataFeed from "./DynamicDataFeed.jsx";
import PropTypes from "prop-types";
import useLanguagePrefix from "../../services/languagePrefix.jsx";
import MetaTags from "../../components/Common/MetaTags.jsx";
import './DynamicDataFullMode.scss';
import {LoadingContext} from "../../context/loading-context.jsx";
export default function DynamicDataFullMode({ types, endpoint, renderFields }) {
    const navigate = useNavigate();

    const { alias } = useParams();
    const langPrefix = useLanguagePrefix();

    // State variables for type information and selected date.
    const [typeInformation, setTypeInformation] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleTypeInformation = (type) => {
        setTypeInformation(type);
        navigate(`/${langPrefix}/${types}?category=${type}`);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        const formattedDate = date ? formatLongDate(null, date) : null;
        navigate(`/${langPrefix}/${types}?date=${formattedDate}`);
    };
    const formatLongDate = (locale, date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const {data, isFetching} =  useDynamicPageQuery({ types:`${types}`, alias:`${alias}`});
    const id = data?.nid?.[0]?.value;

    const {loadingState, setLoadingValue} = useContext(LoadingContext)
    useEffect(() => {
        if(!isFetching){setLoadingValue({ DynamicDataFullMode: true });} else { setLoadingValue({ DynamicDataFullMode: false } )}
    }, [isFetching]);
    return (
        <>
            {data &&(
                <MetaTags type={"content"} data={data}  />
            )}
            <div className="container">
                <div className="dynamic-data-full-mode">
                    <div className="dynamic-data-full-mode__left">
                        {renderFields(data)}
                        {id && (
                            <DynamicDataFeed id={id} type={types} />
                        )}
                    </div>
                    <div className="dynamic-data-full-mode__right">
                        <CalendarFilter selectedDate={selectedDate} onDateChange={handleDateChange} />
                        <TypeFilterButtons handleTypeInformation={handleTypeInformation} />
                    </div>
                </div>
            </div>
        </>
    );
}

DynamicDataFullMode.propTypes = {
    types: PropTypes.string.isRequired,
    endpoint: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    renderFields: PropTypes.func.isRequired,
};

