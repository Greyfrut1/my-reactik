// Import necessary components for the Events page.
import DynamicDataBlocks from "../components/DynamicDataBlocks.jsx";
import ImageComponent from "../components/ImageComponent.jsx";

// Define the Events functional component.
function Events() {
    // Render the Events component using DynamicDataBlocks for fetching and displaying event data.
    return (
        <>
            <DynamicDataBlocks
                // Specify the type of data as 'events'.
                type="events"
                // Define the endpoint for fetching events data based on date and category filters.
                endpoint={(date, category) =>
                    `jsonapi/views/events/block_1?views-filter[created]=${date}&views-filter[field_type_target_id]=${category}`
                }
                // Render each event using the specified JSX with item data and index.
                render={(item, index) => (
                    <div key={index}>
                        {/* Render a link to the event's path with the event title. */}
                        <a href={item?.attributes?.path?.alias}>{item.attributes.title}</a>

                        {/*
                            Render the ImageComponent with the event's image data.
                            Pass the URL, image style, and alt text as props.
                        */}
                        <ImageComponent url={item?.relationships?.field_image?.data?.meta?.drupal_internal__target_id}
                                        imagestyle=""
                                        alt={item?.relationships?.field_image?.data?.meta?.alt}
                        />
                        <p>{item?.attributes?.field_description?.summary}</p>
                    </div>
                )}
            />
        </>
    );
}

// Export the Events component for use in other parts of the application.
export default Events;
