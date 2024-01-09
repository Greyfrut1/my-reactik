import React from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import ImageComponent from "../../components/Image/ImageComponent.jsx";
import useLanguagePrefix from "../../services/languagePrefix.jsx";
import './AlbumsSlider.scss';


function PhotoAlbumSlider({data}) {
    var settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        useTransform: false,
    };
    const lanPrefix = useLanguagePrefix();
    return (
        <Slider {...settings} className="albums-slider">
            {/* Mapping through the array of slides */}
            {data?.data?.map((slide) => (
                <div key={slide.id} className="albums-slider__item">
                    {/* Rendering the ImageComponent with the specified URL and style */}
                    <div className="albums-slider__image">
                        <ImageComponent
                            url={slide?.relationships?.field_image?.data?.meta?.drupal_internal__target_id}
                            alt=""/>
                    </div>
                    <h3 className="albums-slider__title">
                        <a href={`/${lanPrefix}${slide?.attributes?.path?.alias}`}>{slide.attributes.title}</a></h3>
                </div>
            ))}
        </Slider>
    );
}

PhotoAlbumSlider.propTypes = {
    data: PropTypes.oneOfType([
        PropTypes.object.isRequired,
        PropTypes.array.isRequired,
    ]),
};

export default PhotoAlbumSlider;
