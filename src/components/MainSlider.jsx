import ImageComponent from "./ImageComponent.jsx";
import Slider from "react-slick";
import PropTypes from "prop-types";
import FieldLink from "./FieldLink.jsx";

// Functional component for rendering a main slider
function MainSlider({data}) {
    // Configuration settings for the Slider component
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    };

    return (
        // Using the Slider component with specified settings
        <Slider {...settings}>
            {/* Mapping through the array of slides */}
            {data?.data?.map((slide) => (
                <div key={slide?.attributes?.info}>
                    {/* Displaying the information/title of the slide */}
                    <h3>{slide?.attributes?.info}</h3>
                    {/* Rendering the ImageComponent with the specified URL and style */}
                    <ImageComponent url={slide?.relationships?.field_image?.data?.meta?.drupal_internal__target_id}
                                    imagestyle='news_275x185'/>
                    {/* Rendering the FieldLink component if a related link exists */}
                    <div dangerouslySetInnerHTML={{__html: slide?.attributes?.field_description?.value}}/>
                    {slide?.relationships?.field_link?.links?.related?.href && <FieldLink url={new URL(slide?.relationships?.field_link?.links?.related?.href).pathname} text="Докладніше"/>}
                </div>
            ))}
        </Slider>
    );
}

MainSlider.propTypes = {
    data: PropTypes.oneOfType([
        PropTypes.object.isRequired,
        PropTypes.array.isRequired,
    ]),
};

export default MainSlider