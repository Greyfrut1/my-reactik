import Slider from "react-slick";
import {useFooterPartnersBlockQuery} from "../../services/api.js";
import ImageComponent from "../../components/Image/ImageComponent.jsx";
import {Link} from "react-router-dom";
import './PartnersSlider.scss';

export default function PartnersSlider() {
    const { data } = useFooterPartnersBlockQuery();

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

    return (
        <Slider {...settings} className="partner-slider container">
            {data?.data?.field_partner?.map((slide,index) => (
                <Link key={index} className="partner-slider__item" to={slide.field_link_to_partner.uri}>
                    <ImageComponent alt={slide?.field_image?.alt} imagestyle={"thumbnail"} url={slide?.field_image?.meta?.drupal_internal__target_id}/>
                </Link>
            ))}
        </Slider>
    );
}