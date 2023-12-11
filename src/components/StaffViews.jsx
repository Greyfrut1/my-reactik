import PropTypes from "prop-types";
import React, {useState} from "react";
import useDrupalData from "../services/api.jsx";
import ImageComponent from "./ImageComponent.jsx";
import useLanguagePrefix from "../services/languagePrefix.jsx";

function StaffViews({data}) {
    const languagePrefix = useLanguagePrefix();
    return (
        <div className={"container"}>
            <div className="staff-view grid grid-cols-2 md:gap-10 gap-20 sm:grid-cols-1">
                {data?.data?.map((item, index) => (
                    <div key={index} className={"staff-item flex flex-col"}>
                        <ImageComponent
                            url={item?.relationships?.field_image?.data?.meta?.drupal_internal__target_id}
                            imagestyle={"small_large_photoalbums_134_172_"}
                            alt={item?.relationships?.field_image?.data?.meta?.alt}
                        />
                        <h2 className={"staff-item__title"}><a
                            href={`/${languagePrefix}${item?.attributes?.path?.alias}`}>{item.attributes.title}</a></h2>
                        <p className={"staff-item__position"}>{item.attributes.field_position_and_rank}</p>
                        <p className={"staff-item__location"}>{item.attributes?.field_location}</p>
                        <a className="staff-item__phone" href={`tel:${item.attributes?.field_phone}`}>
                            {item.attributes?.field_phone}
                        </a>
                        <a className="staff-item__mail"
                           href={`mailto:${item.attributes?.field_mail}`}>
                            {item.attributes?.field_mail}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}

StaffViews.propTypes = {
    data: PropTypes.oneOfType([
        PropTypes.object.isRequired,
        PropTypes.array.isRequired,
    ]),
};

export default StaffViews;