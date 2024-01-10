import useLanguagePrefix from "../../services/languagePrefix.jsx";
import ContactInformation from "../../components/Common/ContactInformation.jsx";
import MetaTags from "../../components/Common/MetaTags.jsx";
import {Link, useLocation} from "react-router-dom";
import './BranchesView.scss';
import React from "react";

export default function BranchesView({data}){
    const languagePrefix = useLanguagePrefix();
    const location = useLocation();
    const currentPath = location.pathname;
    return (
        <>
            <MetaTags type={"view"} data={data} viewUrl={currentPath}/>
            <div className={"branches container"}>
                <div className="branches-view">
                    {data?.data?.map((item, index) => (
                        <div key={index} className={"branches-item"}>
                            <img src={item?.field_image?.image_style_uri?.['small_large_photoalbums_134_172_']}
                                 alt={item?.field_image?.meta?.alt}/>
                            <h2 className={"branches-item__title"}><Link
                                to={`/${languagePrefix}${item?.path?.alias}`}>{item.title}</Link>
                            </h2>
                            <ContactInformation data={item} type={"views"}/>
                        </div>
                    ))}
                </div>
            </div>
        </>

    );
}