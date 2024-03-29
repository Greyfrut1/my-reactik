import {useNewsViewQuery} from "../../services/api.js";
import useLanguagePrefix from "../../services/languagePrefix.jsx";
import './NewsBannerBlock.scss';
import {format} from "date-fns";
import {uk} from "date-fns/locale";
import {useContext, useEffect} from "react";
import {LoadingContext} from "../../context/loading-context.jsx";

export default function NewsBannerBlock() {

    const {data: mainNews, isFetching} =  useNewsViewQuery({endpoint: `block_2`});
    const langPrefix = useLanguagePrefix();
    const {setLoadingValue} = useContext(LoadingContext)
    useEffect(() => {
        if(!isFetching){setLoadingValue({ NewsBannerBlock: true });} else { setLoadingValue({ NewsBannerBlock: false } )}
    }, [isFetching]);
    return (
        <div className="main-news">
            <div className="main-news__left">
                <div className="main-news__first main-news__item">
                    <div className={"cover-text"}>
                        {mainNews?.data?.[0]?.created && (
                            <>
                                {langPrefix === 'uk' && <div
                                    className="date_field">{format(new Date(mainNews?.data?.[0]?.created), 'dd MMMM HH:mm', {locale: uk})}</div>}
                                {langPrefix === 'en' && <div
                                    className="date_field">{format(new Date(mainNews?.data?.[0]?.created), 'dd MMMM HH:mm')}</div>}
                            </>
                        )}
                        <div className={"teaser_title"}>{mainNews?.data?.[0]?.title}</div>
                    </div>
                    <img src={mainNews?.data?.[0]?.field_image?.image_style_uri?.['main_news_first_item']}
                         alt={mainNews?.data?.[0]?.field_image?.meta?.alt}/>
                </div>
            </div>
            <div className="main-news__right">
                <div className="top">
                    <div className="main-news__second main-news__item">
                        <div className="cover-text">
                            {mainNews?.data?.[1]?.created && (
                                <>
                                    {langPrefix === 'uk' && <div
                                        className="date_field">{format(new Date(mainNews?.data?.[1]?.created), 'dd MMMM HH:mm', {locale: uk})}</div>}
                                    {langPrefix === 'en' && <div
                                        className="date_field">{format(new Date(mainNews?.data?.[1]?.created), 'dd MMMM HH:mm')}</div>}
                                </>
                            )}
                            <div className="teaser_title">{mainNews?.data?.[1]?.title}</div>
                        </div>
                        <img src={mainNews?.data?.[1]?.field_image?.image_style_uri?.['main_news_second_third_items']}
                             alt={mainNews?.data?.[1]?.field_image?.meta?.alt}/>
                    </div>
                    <div className="main-news__third main-news__item">
                        <div className="cover-text">
                            {mainNews?.data?.[2]?.created && (
                                <>
                                    {langPrefix === 'uk' && <div
                                        className="date_field">{format(new Date(mainNews?.data?.[2]?.created), 'dd MMMM HH:mm', {locale: uk})}</div>}
                                    {langPrefix === 'en' && <div
                                        className="date_field">{format(new Date(mainNews?.data?.[2]?.created), 'dd MMMM HH:mm')}</div>}
                                </>
                            )}
                            <div className={"teaser_title"}>{mainNews?.data?.[2]?.title}</div>
                        </div>
                        <img src={mainNews?.data?.[2]?.field_image?.image_style_uri?.['main_news_second_third_items']}
                             alt={mainNews?.data?.[2]?.field_image?.meta?.alt}/>
                    </div>
                </div>
                <div className={"bottom"}>
                    <div className={"main-news__fourth main-news__item"}>
                        <div className={"cover-text"}>
                            {mainNews?.data?.[3]?.created && (
                                <>
                                    {langPrefix === 'uk' && <div
                                        className="date_field">{format(new Date(mainNews?.data?.[3]?.created), 'dd MMMM HH:mm', {locale: uk})}</div>}
                                    {langPrefix === 'en' && <div
                                        className="date_field">{format(new Date(mainNews?.data?.[3]?.created), 'dd MMMM HH:mm')}</div>}
                                </>
                            )}
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
