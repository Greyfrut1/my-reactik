import DynamicDataBlocks from "../../views/DynamicData/DynamicDataBlocks.jsx";
import ImageComponent from "../../components/Image/ImageComponent.jsx";
import useLanguagePrefix from "../../services/languagePrefix.jsx";
import {uk} from "date-fns/locale";
import {format} from "date-fns";

function News() {
    const languagePrefix = useLanguagePrefix();
    const langPrefix = useLanguagePrefix();
    return (
        <>
            <DynamicDataBlocks
                // Specify the type of data as 'news'.
                type="news"
                // Define the endpoint for fetching news data based on date, category, and current page.
                endpoint={(date, category, currentPage) =>
                    `jsonapi/views/news/block_1?page=${currentPage}&views-filter[created]=${date}&views-filter[type_news]=${category}`
                }
                render={
                    <div className={"news-card"} key={index}>
                        <div className={"news-card-top"}>
                            {item?.relationships?.field_image?.data?.meta?.drupal_internal__target_id && (
                                <ImageComponent
                                    url={item?.relationships?.field_image?.data?.meta?.drupal_internal__target_id}
                                    imagestyle={'newsblockcard'}
                                    alt={item?.relationships?.field_image?.data?.meta?.alt}
                                />
                            )}
                        </div>
                        <div className={"news-card-bottom"}>
                            {langPrefix === 'uk' && <div
                                className={"date_field"}>{format(new Date(item.attributes.created), 'dd MMMM HH:mm', {locale: uk})}</div>}
                            {langPrefix === 'en' && <div
                                className={"date_field"}>{format(new Date(item.attributes.created), 'dd MMMM HH:mm')}</div>}
                            <a className={"teaser_title"}
                               href={`/${languagePrefix}${item?.attributes?.path?.alias}`}>{item.attributes.title}</a>
                        </div>
                    </div>
                }
            />
        </>
    );
}

export default News;
