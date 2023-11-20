import ImageComponent from "./ImageComponent.jsx";
import PropTypes from "prop-types";

// Functional component for rendering a block of actual news
function ActualNewsBlock({data}) {
    return (
        <div>
            {/* Mapping through the array of news articles */}
            {data?.data?.map((article) => (
                // Each news article is wrapped in a div with a unique key
                <div key={article.id}>
                    {/* Rendering the ImageComponent with the specified URL and style */}
                    <ImageComponent url={article?.relationships?.field_image?.data?.meta?.drupal_internal__target_id}
                                    imagestyle='news_275x185' alt={"test"}/>
                    {/* Displaying the title of the news article */}
                    <div><h3>{article?.attributes?.title}</h3></div>
                    {/* Displaying the summary or description of the news article */}
                    <div><span>{article?.attributes?.field_description?.summary}</span></div>
                    {/* Link to read more, with an image and text */}
                    <div>
                        <a href={article?.attributes?.path?.alias}><div><img src='/src/assets/home-tick.png'/></div>
                        Читати далі</a>
                    </div>
                </div>

            ))}
        </div>
    )
}

// Prop type validation for the 'data' prop
ActualNewsBlock.propTypes = {
    data: PropTypes.oneOfType([
        PropTypes.object.isRequired,
        PropTypes.array.isRequired,
    ]),
};

export default ActualNewsBlock