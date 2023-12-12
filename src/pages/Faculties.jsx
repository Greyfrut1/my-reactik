import useDrupalData from "../services/api.jsx";
import ImageComponent from "../components/ImageComponent.jsx";
import useLanguagePrefix from "../services/languagePrefix.jsx";
import ContactInformation from "../components/ContactInformation.jsx";
import React from "react";

function Faculties() {
    const {data: facultyData} = useDrupalData('jsonapi/views/faculties/page_1')
    const languagePrefix = useLanguagePrefix()
    console.log(facultyData)
    return (
        <div className={"container flex justify-between flex-wrap"}>
            {facultyData?.data?.map((item, index) => (
                <div className={"faculty_item flex"} key={index}>
                    <div>
                        <a href={`/${languagePrefix}${item?.attributes?.path?.alias}`}>
                            <ImageComponent imagestyle={"thumbnail"} alt={""} url={item?.relationships?.field_image?.data?.meta?.drupal_internal__target_id} />
                        </a>
                    </div>
                    <div>
                        <div><a href={`/${languagePrefix}${item?.attributes?.path?.alias}`}>{item?.attributes?.title}</a>
                        </div>
                        <ContactInformation data={item.attributes} type={"views"}/>
                    </div>
                </div>
            ))}
        </div>

    );
}

export default Faculties