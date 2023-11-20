import React from 'react';
import useDrupalData from "../services/api.jsx";
import ImageComponent from "./ImageComponent.jsx";

// Access the base URL for the backend from environment variables.
const baseURL = import.meta.env.VITE_BACKEND_URL;

/**
 * MediaComponent is a React component used for rendering media items such as files, photos, and videos.
 * It takes 'target_id' as a prop and fetches data from the Drupal API to display the corresponding media.
 * The displayed media is handled by the ImageComponent component.
 */
const MediaComponent = ({ url, imagestyle, alt, target_id }) => {
    // Fetch data using useDrupalData hook with the specified media endpoint.
    const { data: mediaData } = useDrupalData(`/media/${target_id}/edit?_format=json`);

    return (
        <>
            {/* Render ImageComponent with data from the media endpoint */}
            <ImageComponent
                alt={alt}
                imagestyle={imagestyle}
                url={mediaData?.field_media_image?.[0]?.target_id}
            />
        </>
    );
};

// Export MediaComponent for use in other parts of the application.
export default MediaComponent;
