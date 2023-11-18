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
        <div className={"container"}>
            <div className={"albums-view"}>
                {albumsData?.data?.map((item, index) => (
                    <div className={"albums-card"} key={index}>
                        <a className={"albums-card-title"} href={item?.attributes?.path?.alias}>{item.attributes.title}</a>
                        <div className={"albums-card-img"}>
                            <ImageComponent url={item?.relationships?.field_image?.data?.meta?.drupal_internal__target_id}
                                            imagestyle="dynamicdata_243x231"
                                            alt={item?.relationships?.field_image?.data?.meta?.alt}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Photoalbums;