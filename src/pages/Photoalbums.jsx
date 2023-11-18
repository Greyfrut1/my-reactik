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
                <ImageComponent url={item?.relationships?.field_image?.data?.meta?.drupal_internal__target_id}
                                imagestyle=""
                                alt={item?.relationships?.field_image?.data?.meta?.alt}
                />
            </div>
        ))}
        </div>
    );
}

export default Photoalbums;