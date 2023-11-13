import React from "react";
import DynamicDataFullMode from "../components/DynamicDataFullMode.jsx";
import ImageComponent from "../components/ImageComponent.jsx"; // Замініть шлях на ваш реальний шлях

function EventsFullMode() {
    return <DynamicDataFullMode
        types="events"
        endpoint={(alias) => `events/${alias}?_format=json`}
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
    />;
}

export default EventsFullMode;