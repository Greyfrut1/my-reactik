import {useFacultiesViewQuery} from "../../services/api.jsx";
import useLanguagePrefix from "../../services/languagePrefix.jsx";
import ContactInformation from "../../components/Common/ContactInformation.jsx";
import React from "react";
import MetaTags from "../../components/Common/MetaTags.jsx";
import {Link, useLocation} from "react-router-dom";

function Faculties() {
    const languagePrefix = useLanguagePrefix()
    const {data: facultyData} = useFacultiesViewQuery;
    const location = useLocation();
    const currentPath = location.pathname;
    return (
        <>
            <MetaTags type={"view"} data={facultyData} viewUrl={currentPath}/>
            <div className={"container flex justify-between flex-wrap"}>
                {facultyData?.data?.map((item, index) => (
                    <div className={"faculty_item flex"} key={index}>
                        <div>
                            <Link to={`/${languagePrefix}${item?.path?.alias}`}>
                                <img src={item?.field_image?.image_style_uri?.['thumbnail']}
                                     alt={item?.field_image?.meta?.alt}/>
                            </Link>
                        </div>
                        <div>
                           <Link to={`/${languagePrefix}${item?.path?.alias}`}>{item?.title}</Link>
                            <ContactInformation data={item} type={"views"}/>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Faculties