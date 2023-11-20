import {format} from "date-fns";
import ImageComponent from "./ImageComponent.jsx";
import Slider from "react-slick";
import PropTypes from "prop-types";

// Function to truncate text to a specified maximum length
function truncateText(text, maxLength) {
    if (text && text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    }
    return text;
}


// Functional component for rendering an events slider
function EventsSlider({data}) {
    // Settings configuration for the Slider component
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 3,
        arrows: false
    };

    return (
        <div>
            {/* Using the Slider component with specified settings */}
            <Slider {...settings}>
                {/* Mapping through the array of events */}
            {data?.data?.map((event) => (
                <div key={event.id}>
                    <div>
                        {/* Displaying the start and end dates of the event in a specific format */}
                        <div>{format(new Date(event?.attributes?.field_duration?.value), 'dd MMMM HH:mm')}</div>
                        <div>{format(new Date(event?.attributes?.field_duration?.end_value), 'dd MMMM HH:mm')}</div>
                    </div>
                    {/* Rendering the ImageComponent with the specified URL and style */}
                    <ImageComponent url={event?.relationships?.field_image?.data?.meta?.drupal_internal__target_id}
                                    imagestyle='news_275x185' alt={"test"}/>
                    {/* Displaying the title of the event */}
                    <div><h3>{event?.attributes?.title}</h3></div>
                    {/* Displaying the truncated description of the event */}
                    <div
                        dangerouslySetInnerHTML={{__html: truncateText(event?.attributes?.field_description?.value, 150)}}/>
                    {/* Link to the event with an arrow icon */}
                    <div><a href={event?.attributes?.path?.alias}><img style={{ backgroundColor: "black", color: "white" }} src="/src/assets/long-arrow-right.png" alt='link'/></a></div>
                </div>
            ))}
            </Slider>
        </div>
    )
}

EventsSlider.propTypes = {
    data: PropTypes.oneOfType([
        PropTypes.object.isRequired,
        PropTypes.array.isRequired,
    ]),
};

export default EventsSlider