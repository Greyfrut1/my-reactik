import DynamicDataBlocks from "../../views/DynamicData/DynamicDataBlocks.jsx";
import ImageComponent from "../../components/Image/ImageComponent.jsx";
import {useWindowSize} from "react-use";
import {useEffect, useState} from "react";
import useLanguagePrefix from "../../services/languagePrefix.jsx";
import {Link} from "react-router-dom";
import ReadMore from "../../views/ReadMore.jsx";

function Events() {
    const size = useWindowSize();
    const [imageStyle, setImageStyle] = useState('');
    const languagePrefix = useLanguagePrefix();

    useEffect(() => {
        if (size.width < 480) {
            setImageStyle('dynamicdata_480x200');
        } else {
            setImageStyle('dynamicdata_243x231');
        }
    }, [size.width]);
    return (
        <>
            <DynamicDataBlocks
                type="events"
                endpoint={(date, category) =>
                    `jsonapi/views/events/block_1?views-filter[created]=${date}&views-filter[field_type_target_id]=${category}`
                }
                render={(item, index) => (
                    <div className={"view-row"}>
                        <div className={"events-block-card mb-[35px]"} key={index}>
                            <div className={"left-box"}>
                                {item?.relationships?.field_image?.data?.meta?.drupal_internal__target_id && (
                                    <ImageComponent url={item?.relationships?.field_image?.data?.meta?.drupal_internal__target_id}
                                                    imagestyle={imageStyle}
                                                    alt={item?.relationships?.field_image?.data?.meta?.alt}
                                    />
                                )}
                            </div>
                            <div className={"right-box"}>
                                <Link className={"right-box-title"} to={`/${languagePrefix}${item?.attributes?.path?.alias}`}>{item.attributes.title}</Link>
                                <div className={"right-box-description"}>{item?.attributes?.field_description?.summary}</div>
                                <div className={"right-box-button"}>
                                    <Link to={`/${languagePrefix}${item?.attributes?.path?.alias}`}><ReadMore/></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            />
        </>
    );
}

export default Events;
