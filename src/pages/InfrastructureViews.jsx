import {useParams} from "react-router-dom";
import useDrupalData from "../services/api.jsx";
import ImageComponent from "../components/ImageComponent.jsx";
import useLanguagePrefix from "../services/languagePrefix.jsx";
import React from "react";
import ContactInformation from "../components/ContactInformation.jsx";
import MapComponent from "../components/MapComponent.jsx";

function InfrastructureViews(){
    const languagePrefix = useLanguagePrefix();
    const {data: infrastructure} = useDrupalData(`/jsonapi/views/infrastructure/page_1`);
    return (
        <div className={"container"}>
            <div className="infrastructure-view grid grid-cols-2 md:gap-10 gap-20 sm:grid-cols-1">
                {infrastructure?.data?.map((item, index) => (
                    <div key={index} className={"infrastructure-item"}>
                        <div className={"infrastructure-item__map"}>
                            <MapComponent
                                containerStyle={{ width: '200px', height: '200px' }}
                                address={item?.attributes?.field_location}
                            />
                        </div>
                        <div className={"infrastructure-item__info"}>
                            <h2 className={"infrastructure-item__info-title"}><a
                                href={`/${languagePrefix}${item?.attributes?.path?.alias}`}>{item.attributes.title}</a>
                            </h2>
                            <ContactInformation data={item.attributes} type={"views"}/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default InfrastructureViews