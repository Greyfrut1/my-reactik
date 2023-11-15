// Import necessary components for the EventsFullMode page.
import DynamicDataFullMode from "../components/DynamicDataFullMode.jsx";
import ImageComponent from "../components/ImageComponent.jsx";

// Define the EventsFullMode functional component.
function EventsFullMode() {
    // Render the EventsFullMode component using DynamicDataFullMode for fetching and displaying detailed event data.
    return (
        <DynamicDataFullMode
            // Specify the type of data as 'events'.
            types="events"
            // Define the endpoint for fetching detailed events data based on the alias.
            endpoint={(alias) => `events/${alias}?_format=json`}
            // Render each field of the event using the specified JSX with data.
            renderFields={(data) => (
                <>
                    {/* Map over field_image data and render ImageComponent for each item. */}
                    {data.field_image?.map((item, index) => (
                        <div key={index}>
                            <ImageComponent url={item.target_id} imagestyle="" alt={item?.alt}/>
                        </div>
                    ))}
                    {/* Map over field_description data and render HTML content for each item. */}
                    {data.field_description?.map((item, index) => (
                        <div key={index}>
                            <div dangerouslySetInnerHTML={{ __html: `${item.value}` }}></div>
                        </div>
                    ))}
                    {/* Map over field_duration data and render start and end values for each item. */}
                    {data.field_duration?.map((item, index) => (
                        <div key={index}>
                            <p>{item.value}</p>
                            <p>{item.end_value}</p>
                        </div>
                    ))}
                    {/* Map over field_location data and render a link to Google Maps for each item. */}
                    {data.field_location?.map((item, index) => (
                        <div key={index}>
                            <a href={`https://www.google.com.ua/maps/search/${item.value}`}>{item.value}</a>
                        </div>
                    ))}
                </>
            )}
        />
    );
}

// Export the EventsFullMode component for use in other parts of the application.
export default EventsFullMode;