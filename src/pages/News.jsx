// Import necessary components for the News page.
import DynamicDataBlocks from "../components/DynamicDataBlocks.jsx";
import ImageComponent from "../components/ImageComponent.jsx";

// Define the News functional component.
function News() {
    // Render the News component using DynamicDataBlocks for fetching and displaying news data.
    return (
        <>
            <DynamicDataBlocks
                // Specify the type of data as 'news'.
                type="news"
                // Define the endpoint for fetching news data based on date, category, and current page.
                endpoint={(date, category, currentPage) =>
                    `jsonapi/views/news/block_1?page=${currentPage}&views-filter[created]=${date}&views-filter[type_news]=${category}`
                }
                // Render each news item using the specified JSX with item data and index.
                render={(item, index) => (
                    <div key={index}>
                        {/* Render a link to the news item's path with the news title. */}
                        <a href={item?.attributes?.path?.alias}>{item.attributes.title}</a>


                        {/*
                            Render the ImageComponent with the news item's image data.
                            Pass the URL, image style, and alt text as props.
                        */}
                        {item?.relationships?.field_image?.data?.meta?.drupal_internal__target_id && (
                            <ImageComponent url={item?.relationships?.field_image?.data?.meta?.drupal_internal__target_id}
                                            imagestyle=""
                                            alt={item?.relationships?.field_image?.data?.meta?.alt}
                            />
                        )}

                        {/* Render a div with the summary of the news item's description. */}
                        <div>{item?.attributes?.field_description?.summary}</div>
                    </div>
                )}
            />
        </>
    );
}

// Export the News component for use in other parts of the application.
export default News;
