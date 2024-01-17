import useLanguagePrefix from "../../services/languagePrefix.jsx";
import {Link} from "react-router-dom";
import ReadMore from "../../views/ReadMore.jsx";
import {useEventViewBlockQuery} from "../../services/api.js";
import queryString from "query-string";

export default function EventsView() {

    const languagePrefix = useLanguagePrefix();
    const search = window.location.search;
    const parsed = queryString.parse(search);
    const date = parsed.date;
    const category = parsed.category || 'All';
    const {data} = useEventViewBlockQuery({category: `${category}`, date: `${date}`});

    return (
        <>
            {data?.data?.map((item, index) => (
                <div className={"view-row"}>
                    <div className={"events-block-card mb-[35px]"} key={index}>
                        <div className={"left-box"}>
                            <img src={item?.field_image?.image_style_uri?.['dynamicdata_243x231']}
                                 alt={item?.field_image?.meta?.alt}/>
                        </div>
                        <div className={"right-box"}>
                            <Link className={"right-box-title"}
                                  to={`/${languagePrefix}${item?.path?.alias}`}>{item.title}</Link>
                            <p
                                className={"right-box-description"}>{item?.field_description?.summary}</p>
                            <div className={"right-box-button"}>
                                <Link to={`/${languagePrefix}${item?.path?.alias}`}><ReadMore/></Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}