import useLanguagePrefix from "../../services/languagePrefix.jsx";
import {useActualNewsBlockQuery} from '../../services/api';
import {Link} from "react-router-dom";
import './ActualNewsBlock.scss';

export default function ActualNewsBlock() {

    const {data} = useActualNewsBlockQuery();
    const languagePrefix = useLanguagePrefix();
    return (
        <div className="actual-news">
            <div className="actual-news__block container">
                {data?.data?.map((article, index) => (
                    <Link to={`/${languagePrefix}${article?.path?.alias}`} key={index}
                       className="actual-news__item">
                        <img src={article?.field_image?.image_style_uri?.['actual_news']} alt="alt"/>
                        <div className="actual-news__item-content">
                            <Link className="actual-news__item-title"
                                  to={article?.path?.alias}>{article?.title}</Link>
                            <hr/>
                            <p className="actual-news__item-summary">
                                {article?.field_description?.summary}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}