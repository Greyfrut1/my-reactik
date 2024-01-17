import Slider from "react-slick";
import {useFooterPartnersBlockQuery} from "../../services/api.js";
import ImageComponent from "../../components/Image/ImageComponent.jsx";
import {Link} from "react-router-dom";
import './PartnersSlider.scss';
import {useContext, useEffect} from "react";
import {LoadingContext} from "../../context/loading-context.jsx";

export default function PartnersSlider() {
    const { data, isFetching } = useFooterPartnersBlockQuery();

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 3,
        arrows: false,
        useTransform: false,
        responsive: [
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 2,
                    infinite: true,
                },
            },
            {
                breakpoint: 1170,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    arrows: false,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    const {setLoadingValue} = useContext(LoadingContext)
    useEffect(() => {
        if(!isFetching){setLoadingValue({ PartnersSlider: true });} else { setLoadingValue({ PartnersSlider: false } )}
    }, [isFetching]);
    return (
        <Slider {...settings} className="partner-slider container">
            {data?.data?.field_partner?.map((slide,index) => (
                <a key={index} className="partner-slider__item" href={slide.field_link_to_partner.uri}>
                    <ImageComponent alt={slide?.field_image?.alt} imagestyle={"thumbnail"} url={slide?.field_image?.meta?.drupal_internal__target_id}/>
                </a>
            ))}
        </Slider>
    );
}