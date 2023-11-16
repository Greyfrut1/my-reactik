import ImageComponent from "./ImageComponent.jsx";
import Slider from "react-slick";
import React from "react";

function MainSlider({data}) {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    };
    return (
        <Slider {...settings}>
            {data?.data?.map((slide) => (
                <div key='test'>
                    <h3>{slide?.attributes?.info}</h3>
                    <ImageComponent url={`jsonapi/block_content/slider/${slide?.id}/field_image`}
                                    imageStyle={'news_275x185'}/>
                    <div dangerouslySetInnerHTML={{__html: slide?.attributes?.field_description?.value}}/>
                    <a href='/'>Докладніше</a>
                </div>
            ))}
        </Slider>
    );
}

export default MainSlider