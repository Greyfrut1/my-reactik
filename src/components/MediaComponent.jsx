import useDrupalData from "../services/api.jsx";
import ImageComponent from "./ImageComponent.jsx";

// Access the base URL for the backend from environment variables.
const baseURL = import.meta.env.VITE_BACKEND_URL;

// Define the MediaComponent that takes 'target_id' as a prop.
const MediaComponent = ({ target_id }) => {
    // Fetch data using useDrupalData hook with the specified media endpoint.
    const { data: mediaData } = useDrupalData(`/media/${target_id}/edit?_format=json`);

    return (
        <>
            <ImageComponent alt={''} url={mediaData?.field_media_image?.[0]?.target_id} />
        </>
    );
};

// Export the MediaComponent for use in other parts of the application.
export default MediaComponent;
