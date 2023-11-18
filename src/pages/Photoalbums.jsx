import ImageComponent from "../components/ImageComponent.jsx";
import { useEffect, useState } from "react";
import useDrupalData from "../services/api.jsx";

function Photoalbums() {
    // Define the API URL as a string
    const [apiUrl, setApiUrl] = useState("/jsonapi/views/photoalbums_/block_1");
    // Initialize state to hold the fetched data
    const { data: albumsData, isLoading: albumsIsLoading, error: albumsError } = useDrupalData(apiUrl);

    // Fetch data from the Drupal API using the useDrupalData hook
    useDrupalData(apiUrl, (data) => {
        setJsonData(data);
    });
    return (
        <div>
            {albumsData?.data?.map((item, index) => (
            <div key={index}>
                <a href={item?.attributes?.path?.alias}>{item.attributes.title}</a>
                {item.relationships.field_image && (
                    <ImageComponent url={new URL(item.relationships.field_image.links.related.href).pathname} imagestyle="large" />
                )}
            </div>
        ))}
        </div>
    );
}

export default Photoalbums;