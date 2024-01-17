import DynamicDataFullMode from "../../views/DynamicData/DynamicDataFullMode.jsx";
import ImageComponent from "../../components/Image/ImageComponent.jsx";
import React from "react";
import ShareButtonComponent from "../../components/ShareButtonComponent.jsx";
import CounterComponent from "../../components/CounterComponent.jsx";

export default function NewsFullMode() {
    return (

        <DynamicDataFullMode
            types="news"
            endpoint={(alias) => `news/${alias}?_format=json`}
            renderFields={(data) => (
                <div className={"dynamic-data-full-mode-fields"}>
                    {data?.field_image?.map((item, index) => (
                        <div key={index}>
                            {item?.target_id && (
                                <ImageComponent url={item?.target_id} imagestyle="width_862" alt={item?.alt}/>
                            )}
                        </div>
                    ))}
                    {data?.field_description?.map((item, index) => (
                        <div key={index}>
                            <div className={"field-description"}
                                 dangerouslySetInnerHTML={{__html: `${item?.value}`}}></div>
                        </div>
                    ))}
                    <ShareButtonComponent data={data}/>
                    <CounterComponent/>
                </div>

            )}
        />
    );
}
