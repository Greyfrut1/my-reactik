import {useNewsViewQuery} from "../../services/api.js";
import useLanguagePrefix from "../../services/languagePrefix.jsx";
import {format} from "date-fns";
import {uk} from "date-fns/locale";

export default function NewsBannerBlock() {

    const {data: mainNews} =  useNewsViewQuery({endpoint: `block_2`});
    const langPrefix = useLanguagePrefix();

    return (
        <div className="main-news">
            <div className="main-news__left">
                <div className="main-news__first main-news__item">
                    <div className={"cover-text"}>
                        {langPrefix === 'uk' && <div
                            className={"date_field"}>{format(new Date(mainNews?.data?.[0]?.created), 'dd MMMM HH:mm', {locale: uk})}</div>}
                        {langPrefix === 'en' && <div
                            className={"date_field"}>{format(new Date(mainNews?.data?.[0]?.created), 'dd MMMM HH:mm')}</div>}
                        <div className={"teaser_title"}>{mainNews?.data?.[0]?.attributes?.title}</div>
                    </div>
                    <img src={item?.field_image?.image_style_uri?.['main_news_first_item']}
                         alt={item?.field_image?.meta?.alt}/>
                </div>
            </div>
            <div className="main-news__right">
                <div className="top">
                    <div className="main-news__second main-news__item">
                        <div className="cover-text">
                            {langPrefix === 'uk' && <div
                                className="date_field">{format(new Date(mainNews?.data?.[1]?.created), 'dd MMMM HH:mm', {locale: uk})}</div>}
                            {langPrefix === 'en' && <div
                                className="date_field">{format(new Date(mainNews?.data?.[1]?.created), 'dd MMMM HH:mm')}</div>}
                            <div className="teaser_title">{mainNews?.data?.[1]?.title}</div>
                        </div>
                        <img src={mainNews?.data?.[1]?.field_image?.image_style_uri?.['main_news_second_third_items']}
                             alt={mainNews?.data?.[1]?.field_image?.meta?.alt}/>
                    </div>
                    <div className="main-news__third main-news__item">
                        <div className="cover-text">
                            {langPrefix === 'uk' && <div
                                className={"date_field"}>{format(new Date(mainNews?.data?.[2]?.created), 'dd MMMM HH:mm', {locale: uk})}</div>}
                            {langPrefix === 'en' && <div
                                className={"date_field"}>{format(new Date(mainNews?.data?.[2]?.created), 'dd MMMM HH:mm')}</div>}
                            <div className={"teaser_title"}>{mainNews?.data?.[2]?.title}</div>
                        </div>
                        <img src={mainNews?.data?.[2]?.field_image?.image_style_uri?.['main_news_second_third_items']}
                             alt={mainNews?.data?.[2]?.field_image?.meta?.alt}/>
                    </div>
                </div>
                <div className={"bottom"}>
                    <div className={"main-news__fourth main-news__item"}>
                        <div className={"cover-text"}>
                            {langPrefix === 'uk' && <div
                                className={"date_field"}>{format(new Date(mainNews?.data?.[3]?.created), 'dd MMMM HH:mm', {locale: uk})}</div>}
                            {langPrefix === 'en' && <div
                                className={"date_field"}>{format(new Date(mainNews?.data?.[3]?.created), 'dd MMMM HH:mm')}</div>}
                            <div className={"teaser_title"}>{mainNews?.data?.[3]?.title}</div>
                        </div>
                        <img src={mainNews?.data?.[3]?.field_image?.image_style_uri?.['main_news_fourth_item']}
                             alt={mainNews?.data?.[3]?.field_image?.meta?.alt}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
