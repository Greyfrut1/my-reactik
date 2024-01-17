import {useImageQuery} from "../../services/api.js";
import PropTypes from "prop-types";
import {useContext, useEffect} from "react";
import {LoadingContext} from "../../context/loading-context.jsx";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const ImageComponent = ({ url, imagestyle, alt }) => {

    const { data:  fileData, isFetching } = useImageQuery({ endpoint: `${url}`});
    const imageSource = imagestyle
        ? fileData?.image_style_uri?.[0]?.[imagestyle]
        : `${baseURL}${fileData?.uri?.[0]?.url}`;
    const {setLoadingValue} = useContext(LoadingContext)
    useEffect(() => {
        if(!isFetching){setLoadingValue({ [`ImageComponent${url}`]: true });} else { setLoadingValue({ [`ImageComponent${url}`]: false } )}
    }, [isFetching]);

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