import {useParams} from "react-router-dom";
import useDrupalData from "../services/api.jsx";
import ImageComponent from "../components/ImageComponent.jsx";
import React from "react";
import ContactInformation from "../components/ContactInformation.jsx";

function MuseumFullMode(){
    const { alias } = useParams();
    const {data: museumPage} = useDrupalData(`branches-and-representative-offices/${alias}?_format=json`)
    return (
        <div className={"museum container"}>
            <div className={"museum-info flex flex-row"}>
                {museumPage?.field_image?.[0]?.target_id && (
                    <ImageComponent imagestyle={"dynamicdata_243x231"} alt={""} url={museumPage?.field_image?.[0]?.target_id}/>
                )}
                <div className={"museum-info__contact"}>
                    <h2 className={"museum-info__contact-title"}>{museumPage?.title?.[0]?.value}</h2>
                    <ContactInformation data={museumPage} type={"node"}/>
                </div>
            </div>
            <div
                className={"museum-description"}
                dangerouslySetInnerHTML={{
                    __html: museumPage?.field_description?.[0]?.processed,
                }}
            />
        </div>
    );
}

export default MuseumFullMode