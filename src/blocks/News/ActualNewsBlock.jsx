import useLanguagePrefix from "../../services/languagePrefix.jsx";
import {useActualNewsBlockQuery} from '../../services/api';
import {Link} from "react-router-dom";
import './ActualNewsBlock.scss';

export default function ActualNewsBlock() {

    const { data } = useActualNewsBlockQuery();
    const languagePrefix = useLanguagePrefix();
    return (
        <div className="actual-news-block">
            <div className="actual-news-block__container">
                {data?.data?.map((article, index) => (
                    <a href={`${languagePrefix}${article?.attributes?.path?.alias}`} key={index}
                       className="actual-news-block__item">
                        <img src={data?.included?.[index]?.attributes.image_style_uri?.['actual_news']} alt="alt"/>
                        <div className="actual-news-block__content">
                            <Link className="actual-news-block__title"
                                  to={article?.attributes?.path?.alias}>{article?.attributes?.title}</Link>
                            <p className="actual-news-block__summary">
                                {article?.attributes?.field_description?.summary}</p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    )
}