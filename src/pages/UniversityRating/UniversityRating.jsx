import './UniversityRating.scss';
import {Link} from "react-router-dom";
import {useUniversityRatingViewQuery} from "../../services/api.js";
import {useContext, useEffect} from "react";
import {LoadingContext} from "../../context/loading-context.jsx";

export default function UniversityRating(){
    const {data: ratingView, isFetching} = useUniversityRatingViewQuery();
    const {setLoadingValue} = useContext(LoadingContext)
    useEffect(() => {
        if(!isFetching){setLoadingValue({ UniversityRating: true });} else { setLoadingValue({ UniversityRating: false } )}
    }, [isFetching]);
    return (
        <div className={"rating container"}>
            <div className="rating-view">
                {ratingView?.data?.map((item, index) => (
                    <div key={index}>
                        <Link to={item?.field_link?.full_url} className="rating-item">
                            <img src={item?.field_image?.image_style_uri?.['photoalbums_']}
                                 alt={item?.field_image?.meta?.alt}/>
                            <h1 className={"rating-item__title"}>
                                {item?.title}
                            </h1>
                            <p className="rating-item__top-description">
                                {item?.field_top_description}
                            </p>
                            <p className="rating-item__bottom-description">
                                {item?.field_bottom_description}
                            </p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}