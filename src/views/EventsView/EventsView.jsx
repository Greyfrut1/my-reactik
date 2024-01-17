import {useWindowSize} from "react-use";
import {useContext, useEffect, useState} from "react";
import useLanguagePrefix from "../../services/languagePrefix.jsx";
import {Link} from "react-router-dom";
import ReadMore from "../../views/ReadMore.jsx";
import {useEventViewBlockQuery} from "../../services/api.js";
import queryString from "query-string";
import {LoadingContext} from "../../context/loading-context.jsx";

export default function EventsView() {

    const languagePrefix = useLanguagePrefix();
    const search = window.location.search;
    const parsed = queryString.parse(search);
    const date = parsed.date;
    const category = parsed.category || 'All';
    const {data, isFetching} = useEventViewBlockQuery({category: `${category}`, date: `${date}`});
    const {setLoadingValue} = useContext(LoadingContext)
    useEffect(() => {
        if(!isFetching){setLoadingValue({ EventsView: true });} else { setLoadingValue({ EventsView: false } )}
    }, [isFetching]);
    return (
        <>
            {data?.data?.map((item, index) => (
                <div key={index} className={"view-row"}>
                    <div className={"events-block-card mb-[35px]"}>
                        <div className={"left-box"}>
                            <img src={item?.field_image?.image_style_uri?.['dynamicdata_243x231']}
                                 alt={item?.field_image?.meta?.alt}/>
                        </div>
                        <div className={"right-box"}>
                            <a className={"right-box-title"}
                                  href={`/${languagePrefix}${item?.path?.alias}`}>{item.title}</a>
                            <p
                                className={"right-box-description"}>{item?.field_description?.summary}</p>
                            <div className={"right-box-button"}>
                                <a href={`/${languagePrefix}${item?.path?.alias}`}><ReadMore/></a>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}