import React from "react";
import DynamicDataFullMode from "../components/DynamicDataFullMode.jsx";
import DynamicDataFeed from "../components/DynamicDataFeed.jsx"; // Замініть шлях на ваш реальний шлях

function NewsFullMode() {
    return (
        <>
            <DynamicDataFullMode
                types="news"
                endpoint={(alias) => `news/${alias}?_format=json`}
                renderFields={(data) => (
                    <>
                        {data.title?.map((item, index) => (
                            <div className="w-full" key={index}>
                                <p>title : {item.value}</p>
                            </div>
                        ))}
                        {data.field_description?.map((item, index) => (
                            <div className="w-full" key={index}>
                                <p dangerouslySetInnerHTML={{ __html: `field_description: ${item.value}` }}></p>
                            </div>
                        ))}
                    </>
                )}
            />
        </>
        )
    ;
}

export default NewsFullMode;