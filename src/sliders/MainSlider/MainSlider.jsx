import Slider from "react-slick";
import {useMainSliderQuery} from "../../services/api.js";
import {Link} from "react-router-dom";
import ReadMore from "../../views/ReadMore.jsx";
import './MainSlider.scss';


export default function MainSlider() {
    const { data } = useMainSliderQuery();

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        useTransform: false
    };

    return (
        <Slider {...settings} className="main-slider">
            {data?.data?.map((slide,index) => (
                <div key={index} className="main-slider__item">
                    <img src={slide?.field_image?.image_style_uri?.['wide']}
                         alt={slide?.field_image?.meta?.alt}/>
                    <div className="main-slider__overlay"/>
                    <div className="main-slider__item-content">
                        <h3 className="main-slider__title">{slide?.info}</h3>
                        <div className="main-slider__line"/>
                        <div
                            className="main-slider__description">{slide?.field_description?.value.replace(/(<([^>]+)>)/gi, '')}</div>
                        <Link className="main-slider__link" to={slide?.field_link?.path?.alias}>
                            <ReadMore />
                        </Link>
                    </div>
                </div>
            ))}
        </Slider>
    );
}