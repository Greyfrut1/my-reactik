import React from 'react';
import {useMediaQuery} from "../../services/api.js";
import ImageComponent from "./ImageComponent.jsx";


/**
 * MediaComponent is a React component used for rendering media items such as files, photos, and videos.
 */
export default function MediaComponent ({imagestyle, alt, target_id }) {

    const { data:  mediaData } = useMediaQuery({ endpoint: `${target_id}`});
    return (
        <>
            <ImageComponent
                alt={alt}
                imagestyle={imagestyle}
                url={mediaData?.field_media_image?.[0]?.target_id}
            />
        </>
    );
};
