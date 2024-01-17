import { useNewsViewFeedQuery} from "../../services/api.js";
import PropTypes from "prop-types";
import useLanguagePrefix from "../../services/languagePrefix.jsx";
import './DynamicDataFeed.scss';
import {Link} from "react-router-dom";
import {useContext, useEffect} from "react";
import {LoadingContext} from "../../context/loading-context.jsx";

export default function DynamicDataFeed({id, type}) {
    const { data:  feedData, isFetching } =  useNewsViewFeedQuery({ type:  `${type}`, id: `${id}`});
    const langPrefix = useLanguagePrefix();
    const {loadingState, setLoadingValue} = useContext(LoadingContext)
    useEffect(() => {
        if(!isFetching){setLoadingValue({ DynamicDataFeed: true });} else { setLoadingValue({ DynamicDataFeed: false } )}
    }, [isFetching]);
    return (
        <>
            {feedData?.data?.length > 0 && (
                <div className={"feed-data"}>
                    <h1 className={"feed-data-title"}>Other {type}</h1>
                    <div className={"feed-data-container"}>
                        {feedData?.data?.map((item) => (
                            <div className={"feed-data-item items-center flex gap-2.5"}
                                 key={item?.attributes?.drupal_internal__nid}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
                                </svg>
                                <a href={`/${langPrefix}${item?.attributes?.path?.alias}`}>{item.attributes.title}</a>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

DynamicDataFeed.propTypes = {
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
};
