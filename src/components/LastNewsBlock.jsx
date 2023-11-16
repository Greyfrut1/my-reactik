import ImageComponent from "./ImageComponent.jsx";
import React from "react";
import Slider from "react-slick";

function LastNewsBlock({data}) {
    return (
        <div>
            {data?.data?.map((news) => (
                <div key={news.id}>
                    <ImageComponent url={`jsonapi/node/news/${news?.id}/field_image`}
                                    imageStyle={'news_275x185'}/>
                    <div><h3>{news?.attributes?.title}</h3></div>
                    <div><span>{news?.attributes?.field_description?.summary}</span></div>
                </div>
            ))}
        </div>
    )
}

export default LastNewsBlock
