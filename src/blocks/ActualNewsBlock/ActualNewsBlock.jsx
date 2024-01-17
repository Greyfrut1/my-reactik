import useLanguagePrefix from "../../services/languagePrefix.jsx";
import {useActualNewsBlockQuery} from '../../services/api';
import {Link} from "react-router-dom";
import './ActualNewsBlock.scss';
import {useContext, useEffect} from "react";
import {LoadingContext} from "../../context/loading-context.jsx";

export default function ActualNewsBlock() {

    const {data, isFetching} = useActualNewsBlockQuery();
    const languagePrefix = useLanguagePrefix();
    const {setLoadingValue} = useContext(LoadingContext)
    useEffect(() => {
        if(!isFetching){setLoadingValue({ ActualNewsBlock: true });} else { setLoadingValue({ ActualNewsBlock: false } )}
    }, [isFetching]);
    return (
        <div className="actual-news">
            <div className="actual-news__block container">
                {data?.data?.map((article, index) => (
                    <a href={`/${languagePrefix}${article?.path?.alias}`} key={index}
                       className="actual-news__item">
                        <img src={article?.field_image?.image_style_uri?.['actual_news']} alt="alt"/>
                        <div className="actual-news__item-content">
                            <a className="actual-news__item-title"
                                  href={article?.path?.alias}>{article?.title}</a>
                            <hr/>
                            <p className="actual-news__item-summary">
                                {article?.field_description?.summary}</p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    )
}