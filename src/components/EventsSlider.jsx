import {format} from "date-fns";
import ImageComponent from "./ImageComponent.jsx";
import React from "react";
import Slider from "react-slick";

function truncateText(text, maxLength) {
    if (text && text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    }
    return text;
}

function EventsSlider({data}) {

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
            <Slider {...settings}>
            {data?.data?.map((event) => (
                <div key={event.id}>
                    <div>
                        <div>{format(new Date(event?.attributes?.field_duration?.value), 'dd MMMM HH:mm')}</div>
                        <div>{format(new Date(event?.attributes?.field_duration?.end_value), 'dd MMMM HH:mm')}</div>
                    </div>
                    <ImageComponent url={`jsonapi/node/events/${event?.id}/field_image`}
                                    imageStyle={'news_275x185'}/>
                    <div><h3>{event?.attributes?.title}</h3></div>
                    <div
                        dangerouslySetInnerHTML={{__html: truncateText(event?.attributes?.field_description?.value, 150)}}/>
                    <div><a href='/'><img src="/src/assets/long-arrow-right.png" alt='link'/></a></div>
                </div>
            ))}
            </Slider>
        </div>
    )
}

export default EventsSlider