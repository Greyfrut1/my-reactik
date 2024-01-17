import PropTypes from "prop-types";
import React from "react";
import useLanguagePrefix from "../../services/languagePrefix.jsx";
import ContactInformation from "../../components/Common/ContactInformation.jsx";
import {Link} from "react-router-dom";
import './StaffView.scss';

function StaffView({data}) {
    const languagePrefix = useLanguagePrefix();
    return (
        <div className={"container"}>
            <div className="staff-view md:gap-10 sm:grid-cols-1">
                {data?.data?.map((item, index) => (
                    <div key={index} className={"staff-item flex flex-col"}>
                        <img src={item?.field_image?.image_style_uri?.['small_large_photoalbums_134_172_']}
                             alt={item?.field_image?.meta?.alt}/>
                        <h2 className={"staff-item__title"}><a
                            href={`/${languagePrefix}${item?.path?.alias}`}>{item?.title}</a></h2>

                        <p className={"staff-item__position"}>{item?.field_position_and_rank}</p>
                        <ContactInformation data={item} type={"views"}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

StaffView.propTypes = {
    data: PropTypes.oneOfType([
        PropTypes.object.isRequired,
        PropTypes.array.isRequired,
    ]),
};

export default StaffView;