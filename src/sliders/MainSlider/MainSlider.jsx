import Slider from "react-slick";
import {useMainSliderQuery} from "../../services/api.js";
import {Link} from "react-router-dom";
import ReadMore from "../../views/ReadMore.jsx";
import './MainSlider.scss';
import {useContext, useEffect} from "react";
import {LoadingContext} from "../../context/loading-context.jsx";


export default function MainSlider() {
    const { data, isFetching } = useMainSliderQuery();

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        useTransform: false
    };
    const {setLoadingValue} = useContext(LoadingContext)
    useEffect(() => {
        if(!isFetching){setLoadingValue({ MainSlider: true });} else { setLoadingValue({ MainSlider: false } )}
    }, [isFetching]);
    return (
        <Slider {...settings} className="main-slider">
            {data?.data?.map((slide,index) => (
                <div key={index} className="main-slider__item">
                    <img src={slide?.field_image?.image_style_uri?.['wide']}
                         alt={slide?.field_image?.meta?.alt}/>
                    <div className="main-slider__overlay"/>
                    <div className="main-slider__item-content  container">
                        <h3 className="main-slider__title">{slide?.info}</h3>
                        <div className="main-slider__line"/>
                        <div
                            className="main-slider__description">{slide?.field_description?.value.replace(/(<([^>]+)>)/gi, '')}</div>
                        <a className="main-slider__link" href={slide?.field_link?.path?.alias}>
                            <ReadMore />
                        </a>
                    </div>
                </div>
            ))}
        </Slider>
    );
}