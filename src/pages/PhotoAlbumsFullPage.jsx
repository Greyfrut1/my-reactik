import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useDrupalData from "../services/api.jsx";
import MediaComponent from "../components/MediaComponent.jsx";

function Lightbox({ images, selectedIndex, onClose }) {
    const [currentIndex, setCurrentIndex] = useState(selectedIndex);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="lightbox">
            <button onClick={onClose} className="button-close">&#10005;</button>
            <div className="lightbox-content">
                <button onClick={handlePrev}>&#8249;</button>
                <MediaComponent target_id={images[currentIndex]?.target_id} imagestyle="photoalbums_" />
                <button onClick={handleNext}>&#8250;</button>
            </div>
        </div>
    );
}

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
        <div className="container">
            {/* Render album titles */}
            {albumsNode.title?.map((item, index) => (
                <div className="album-title" key={index}>
                    <h1>{item.value}</h1>
                </div>
            ))}

            {/* Render album photos using ImageComponent */}
            <div className="album-gallery">
                {albumsNode.field_photos?.map((item, index) => (
                    <div className="album-gallery__img" key={index} onClick={() => openLightbox(index)}>
                        {item?.target_id && (
                            <MediaComponent target_id={item.target_id} imagestyle="dynamicdata_243x231" />
                        )}
                    </div>
                ))}
            </div>

            {/* Lightbox */}
            {lightboxOpen && (
                <Lightbox
                    images={albumsNode.field_photos}
                    selectedIndex={selectedImageIndex}
                    onClose={closeLightbox}
                />
            )}
        </div>
    );
}

export default PhotoAlbumsFullPage;
