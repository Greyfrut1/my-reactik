import React from "react";
import useDrupalData from "../services/api.jsx";

const ImageComponent = ({ url, imagestyle }) => {

    const { data: imageData, isLoading: isImageLoading, error: imageError } = useDrupalData(url);

    if (isImageLoading) {
        return <p>Loading image...</p>;
    }
    if (imageError) {
        return <p>Error loading image: {imageError.message}</p>;
    }
    return <img src={imageData?.data?.attributes?.image_style_uri?.[imagestyle]} alt={imageData?.attributes?.alt} />;

};

export default ImageComponent;