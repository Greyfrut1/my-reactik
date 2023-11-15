// Import the useDrupalData hook to fetch data from Drupal API.
import useDrupalData from "../services/api.jsx";
import PropTypes from "prop-types";

// Define the DynamicDataFeed component that takes 'id' and 'type' as props.
function DynamicDataFeed({id, type}) {
    // Fetch data using useDrupalData hook with the specified endpoint and arguments.
    const {data: feedData} = useDrupalData(`/jsonapi/views/news_in_block/${type}?views-argument[0]=${id}`)

    // Render the DynamicDataFeed component with conditional rendering based on feedData presence.
    return (
        <>
            {feedData?.data && (
                <h1>Last {type}</h1>
            )}
            {/*
                Map over feedData's data items and render a div for each item.
                Each div contains a link to the item's path and the item's title.
            */}
            {feedData?.data?.map((item) => (
                <div key={item?.attributes?.drupal_internal__nid}>
                    <a href={item?.attributes?.path?.alias}>{item.attributes.title}</a>
                </div>
            ))}
        </>
    );
}

// PropTypes block to define the expected types for props
DynamicDataFeed.propTypes = {
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
};

// Export the DynamicDataFeed component for use in other parts of the application.
export default DynamicDataFeed