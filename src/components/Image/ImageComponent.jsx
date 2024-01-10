import {useImageQuery} from "../../services/api.js";
import PropTypes from "prop-types";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const ImageComponent = ({ url, imagestyle, alt }) => {

    const { data:  fileData } = useImageQuery({ endpoint: `${url}`});
    const imageSource = imagestyle
        ? fileData?.image_style_uri?.[0]?.[imagestyle]
        : `${baseURL}${fileData?.uri?.[0]?.url}`;

    return (
        <>
            {url && imageSource && (
                <img src={imageSource} alt={alt} />
            )}
        </>
    );

};

ImageComponent.propTypes = {
    url: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    imagestyle: PropTypes.string,
    alt: PropTypes.string,
};

export default ImageComponent;