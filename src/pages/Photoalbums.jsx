import React, { useEffect, useState } from "react";
import useDrupalData from "../services/api.jsx";
import ImageComponent from "../components/ImageComponent.jsx";
import Pager from "../components/Pager.jsx";

function Photoalbums() {
    const [apiUrl, setApiUrl] = useState("/jsonapi/views/photoalbums_/block_1");
    const [jsonData, setJsonData] = useState(null);
    const { data: albumsData, isLoading: albumsIsLoading, error: albumsError } = useDrupalData(apiUrl);

    useEffect(() => {
        if (albumsData) {
            setJsonData(albumsData);
        }
    }, [albumsData]);

    const handlePageChange = (page) => {
        setApiUrl(`/jsonapi/views/photoalbums_/block_1?page=${page}`);
    };

    const screenWidth = window.innerWidth;

    const containerStyle = {
        display: 'flex',
        align: screenWidth < 1000 ? 'center' : 'flex-start',
        gap: '16px',
    };

    return (
        <div className={"container"}>
            <div className={"albums-view flex flex-wrap"}  style={containerStyle}>
                {jsonData?.data?.map((item, index) => (
                    <div className={"albums-card"} key={index}>
                        <a className={"albums-card__title"} href={item?.attributes?.path?.alias}>{item.attributes.title}</a>
                        <div className={"albums-card__img"}>
                            <ImageComponent
                                url={item?.relationships?.field_image?.data?.meta?.drupal_internal__target_id}
                                imagestyle="dynamicdata_243x231"
                                alt={item?.relationships?.field_image?.data?.meta?.alt}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <Pager
                totalPages={jsonData?.meta?.pager?.totalPages || 1}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

export default Photoalbums;
