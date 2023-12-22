import React from "react";
import useDrupalData from "../services/api.jsx";
import ImageComponent from "../components/ImageComponent.jsx";
import { OpenInNew } from "@mui/icons-material";

// Кореневий блок компоненту
const BLOCK_NAME = "ukraine-above-all";

function UkraineAboveAll() {
    const { data: data } = useDrupalData(`jsonapi/views/ukraine_above_all/page_1`);

    return (
        <div className={`${BLOCK_NAME} container`}>
            {data?.data?.map((item) => (
                <div key={item?.id} className={`${BLOCK_NAME}__item`}>
                    <a href={item?.attributes?.path?.alias} className={`${BLOCK_NAME}__link`}>
                        <OpenInNew className={`${BLOCK_NAME}__icon`} />
                        <ImageComponent
                            alt={item?.attributes?.title}
                            url={item?.relationships?.field_image?.data?.meta?.drupal_internal__target_id}
                            imagestyle="news_440x232"
                        />
                        <div className={`${BLOCK_NAME}__title`}>{item?.attributes?.title}</div>
                    </a>
                </div>
            ))}
        </div>
    );
}

export default UkraineAboveAll;
