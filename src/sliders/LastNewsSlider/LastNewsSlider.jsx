import {useLastNewsSliderQuery} from '../../services/api';
import tick from "/src/assets/home-tick.png"
import Slider from "react-slick";
import useLanguagePrefix from "../../services/languagePrefix.jsx";
import ReadMore from "../../views/ReadMore.jsx";
import {Link} from "react-router-dom";
import './LastNewsSlider.scss';
import {useContext, useEffect} from "react";
import {LoadingContext} from "../../context/loading-context.jsx";


export default function LastNewsSlider() {
    const {data, isFetching} = useLastNewsSliderQuery();
    var settings = {

        dots: true,
        speed: 500,
        slidesToShow: 4,
        arrows: false,
        infinite: false,
        slidesToScroll: 0,
        variableWidth: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    variableWidth: true,
                }
            },
            {
                breakpoint: 975,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    variableWidth: false,
                }
            },
            {
                breakpoint: 670,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    variableWidth: false,
                }
            }
        ]
    };
    const langPrefix = useLanguagePrefix();
    const {setLoadingValue} = useContext(LoadingContext)
    useEffect(() => {
        if(!isFetching){setLoadingValue({ LastNewsSlider: true });} else { setLoadingValue({ LastNewsSlider: false } )}
    }, [isFetching]);
    return (
        <div className="last-news container">
            <h2 className="last-news__title"><a
                href={`/${langPrefix}/news`}>{data?.meta?.title}</a></h2>

            <Slider {...settings}>
                {data?.data?.map((news) => (
                    <div key={news.id} className="last-news__item">
                        <img src={news?.field_image?.image_style_uri?.['news_275x185']}
                             alt={news?.field_image?.meta?.alt}/>
                        <h3 className="last-news__item-title">{news?.title}</h3>
                        <div className="last-news__item-summary">{news?.field_description?.summary}</div>
                        <a href={`/${langPrefix}${news?.path?.alias}`}
                              className="last-news__item-link"><img src={tick} alt="tick"/><p><ReadMore/></p>
                        </a>
                    </div>
                ))}
            </Slider>
        </div>
    )
}
