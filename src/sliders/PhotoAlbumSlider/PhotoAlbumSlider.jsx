import React, {useContext, useEffect} from "react";
import Slider from "react-slick";
import useLanguagePrefix from "../../services/languagePrefix.jsx";
import {Link} from "react-router-dom";
import {usePhotoAlbumsQuery} from "../../services/api.js";
import './PhotoAlbumSlider.scss';
import {LoadingContext} from "../../context/loading-context.jsx";

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
    const {data, isFetching} = usePhotoAlbumsQuery();
    const {setLoadingValue} = useContext(LoadingContext)
    useEffect(() => {
        if(!isFetching){setLoadingValue({ PhotoAlbumSlider: true });} else { setLoadingValue({ PhotoAlbumSlider: false } )}
    }, [isFetching]);
    return (
        <div className="photoalbums-block">
            <h3 className="photoalbums-block__title" >
                <a href={`/${langPrefix}/photoalbums`}>{data?.meta?.title}</a>
            </h3>
            <Slider {...settings} className="photoalbums-block__slider">
                {data?.data?.map((slide) => (
                    <div key={slide?.id} className="photoalbums-block__slider__item">
                        <img className="photoalbums-block__slider__image"
                             src={slide?.field_image?.image_style_uri?.['small_large_photoalbums_134_172_']}
                             alt={slide?.field_image?.meta?.alt}/>
                        <h3 className="photoalbums-block__slider__title">
                            <a
                                href={`/${langPrefix}${slide?.path?.alias}`}>{slide?.title}</a>
                        </h3>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

