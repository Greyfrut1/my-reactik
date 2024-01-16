import {format} from "date-fns";
import {uk} from "date-fns/locale"
import Slider from "react-slick";
import arrow from '/src/assets/long-arrow-right.png'
import useLanguagePrefix from "../../services/languagePrefix.jsx";
import './EventsSlider.scss';
import {Link} from "react-router-dom";
import {useEventsSliderQuery} from "../../services/api.js";

function truncateText(text, maxLength) {
    if (text && text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    }
    return text;
}


export default function EventsSlider() {

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToScroll: 1,
        slidesToShow: 3,
        arrows: false,
        variableWidth: false,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    variableWidth: false,
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    variableWidth: false,
                }
            },
        ]
    };
    const {data} = useEventsSliderQuery();
    const langPrefix = useLanguagePrefix();
    if (data?.data && data.data.length > 3) {
        settings.slidesToShow = 3;
    } else if (data?.data) {
        settings.slidesToShow = data.data.length;
    }

    return (
        <div className="events-slider">
            <div className="container">
                <h2 className="events-slider__title"><Link
                    to={`/${langPrefix}/events`}>{data?.meta?.title}</Link></h2>
                <Slider {...settings}>
                    {data?.data?.map((event) => (
                        <div key={event.id} className="events-slider__item">
                            <div className="events-slider__top">
                                <div className="events-slider__top-date">
                                    {event?.field_duration?.value && (
                                        <>
                                            {langPrefix === 'uk' && <>
                                                <div>{format(new Date(event?.field_duration?.value), 'dd MMMM HH:mm', {locale: uk})}</div>
                                                <div>{format(new Date(event?.field_duration?.end_value), 'dd MMMM HH:mm', {locale: uk})}</div>
                                            </>}
                                            {langPrefix === 'en' && <>
                                                <div>{format(new Date(event?.field_duration?.value), 'dd MMMM HH:mm')}</div>
                                                <div>{format(new Date(event?.field_duration?.end_value), 'dd MMMM HH:mm')}</div>
                                            </>}
                                        </>
                                    )}
                                </div>
                                <img src={event?.field_image?.image_style_uri?.['news_275x185']}
                                     alt={event?.field_image?.meta?.alt}/>
                                <div className="events-slider__top-title"><h3>{event?.title}</h3></div>
                            </div>
                            <div className="events-slider__bottom">
                                <h3 className="events-slider__bottom-title">{event?.title}</h3>
                                <p
                                    dangerouslySetInnerHTML={{__html: truncateText(event?.field_description?.summary, 150)}}
                                    className="events-slider__bottom-summary"/>
                                <div className="events-slider__bottom-link"><Link
                                    to={`/${langPrefix}${event?.path?.alias}`}><img src={arrow} alt='link'/></Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    )
}
