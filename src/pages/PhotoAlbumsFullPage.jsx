import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useDrupalData from "../services/api.jsx";
import MediaComponent from "../components/MediaComponent.jsx";

function PhotoAlbumsFullPage() {
    const { alias } = useParams();
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const {
        data: albumsNode,
        isLoading: albumsNodeIsLoading,
        error: albumsNodeError,
    } = useDrupalData(`photoalbums/${alias}?_format=json`);

    const openLightbox = (index) => {
        setSelectedImageIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    return (
        <div className="albums-container">
            {/* Render album titles */}
            {albumsNode.title?.map((item, index) => (
                <div className="album-title" key={index}>
                    <h1>{item.value}</h1>
                </div>
            ))}

            {/* Render album photos using ImageComponent */}
            <div className="album-photo">
                {albumsNode.field_photos?.map((item, index) => (
                    <div key={index} onClick={() => openLightbox(index)}>
                        {item?.target_id && (
                            <MediaComponent target_id={item.target_id} imagestyle="photoalbums_" />
                        )}
                    </div>
                ))}
            </div>

            {/* Lightbox */}
            {lightboxOpen && (
                <div className="lightbox">
                    <button onClick={closeLightbox}>Close</button>
                    <MediaComponent target_id={albumsNode.field_photos[selectedImageIndex]?.target_id} imagestyle="photoalbums_" />
                </div>
            )}
        </div>
    );
}

export default PhotoAlbumsFullPage;
