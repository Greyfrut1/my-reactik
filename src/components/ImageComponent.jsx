import useDrupalData from "../services/api.jsx";

// eslint-disable-next-line react/prop-types
const ImageComponent = ({ url, imageStyle }) => {
    console.log(url)

    const { data: imageData, isLoading: isImageLoading, error: imageError } = useDrupalData(url);

    if (isImageLoading) {
        return <p>Loading image...</p>;
    }

    if (imageError) {
        return <p>Error loading image: {imageError.message}</p>;
    }
    return <img src={imageData?.data?.attributes?.image_style_uri?.[imageStyle]} alt={imageData?.attributes?.alt} />;

};

export default ImageComponent;