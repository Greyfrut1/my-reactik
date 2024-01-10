import React from "react";
import Slider from "react-slick";
import useLanguagePrefix from "../../services/languagePrefix.jsx";
import {Link} from "react-router-dom";
import {usePhotoAlbumsQuery} from "../../services/api.js";
import './PhotoAlbumSlider.scss';

export default function PhotoAlbumSlider() {
    var settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        useTransform: false,
    };
    const langPrefix = useLanguagePrefix();
    const {data} = usePhotoAlbumsQuery();
    return (
        <div className="photoalbums-block">
            <h3 className="photoalbums-block__title" >
                <Link to={`/${langPrefix}/photoalbums`}>{data?.meta?.title}</Link>
            </h3>
            <Slider {...settings} className="photoalbums-block__slider">
                {data?.data?.map((slide) => (
                    <div key={slide?.id} className="photoalbums-block__slider__item">
                        <img className="photoalbums-block__slider__image"
                             src={slide?.field_image?.image_style_uri?.['small_large_photoalbums_134_172_']}
                             alt={slide?.field_image?.meta?.alt}/>
                        <h3 className="photoalbums-block__slider__title">
                            <Link
                                to={`/${langPrefix}${slide?.attributes?.path?.alias}`}>{slide?.attributes?.title}</Link>
                        </h3>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

