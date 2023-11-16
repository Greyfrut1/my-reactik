import ImageComponent from "./ImageComponent.jsx";
import React from "react";

function ActualNewsBlock({data}) {
    return (
        <div>
            {data?.data?.map((article) => (

                <div key={article.id}>
                    <ImageComponent url={`jsonapi/node/news/${article?.id}/field_image`}
                                    imageStyle={'news_275x185'}/>
                    <div><h3>{article?.attributes?.title}</h3></div>
                    <div><span>{article?.attributes?.field_description?.summary}</span></div>
                    <div>
                        <div><img src='/src/assets/home-tick.png'/></div>
                        Читати далі
                    </div>
                </div>

            ))}
        </div>
    )
}

export default ActualNewsBlock