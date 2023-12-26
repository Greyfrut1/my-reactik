import useDrupalData from "../services/api.jsx";
import ImageComponent from "../components/ImageComponent.jsx";

function UniversityRating(){
    const {data: ratingView} = useDrupalData(`/jsonapi/views/university_rating/page_1`);
    return (
        <div className={"container"}>
            <div className="rating-view grid grid-cols-2 md:gap-10 gap-20 sm:grid-cols-1">
                {ratingView?.data?.map((item, index) => (
                    <div key={index} className={"rating-item flex flex-col justify-center text-center"}>
                        <ImageComponent
                            url={item?.relationships?.field_image?.data?.meta?.drupal_internal__target_id}
                            imagestyle={"thumbnail"}
                            alt={item?.relationships?.field_image?.data?.meta?.alt}
                        />
                        <h1 className={"rating-item__title"}>
                            {item?.attributes?.title}
                        </h1>
                        <p className={"rating-item__top_description"}>
                            {item?.attributes?.field_top_description}
                        </p>
                        <p className={"rating-item__bottom_description"}>
                            {item?.attributes?.field_bottom_description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UniversityRating;