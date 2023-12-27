import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useDrupalData from "../services/api.jsx";
import MediaComponent from "../components/MediaComponent.jsx";
import Metatags from "../components/Metatags.jsx";

function PhotoAlbumsFullPage() {
    const { alias } = useParams();
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [albumsNode, setAlbumsNode] = useState(null);

    const {
        data: albumsNodeData,
        isLoading: albumsNodeIsLoading,
        error: albumsNodeError,
    } = useDrupalData(`photoalbums/${alias}?_format=json`);

    useEffect(() => {
        if (albumsNodeData) {
            setAlbumsNode(albumsNodeData);
        }
    }, [albumsNodeData]);

    const openLightbox = (index) => {
        setSelectedImageIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    const handlePrev = () => {
        setSelectedImageIndex((prevIndex) => (prevIndex === 0 ? albumsNode.field_photos.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setSelectedImageIndex((prevIndex) => (prevIndex === albumsNode.field_photos.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <>
            <Metatags type={"content"} data={albumsNodeData} />
            <div className="container">
                {/* Render album titles */}
                {albumsNode?.title?.map((item, index) => (
                    <div className="album-title" key={index}>
                        <h1>{item.value}</h1>
                    </div>
                ))}

                {/* Render album photos using MediaComponent */}
                <div className="album-gallery flex flex-wrap justify-center">
                    {albumsNode?.field_photos?.map((item, index) => (
                        <div className="album-gallery__img" key={index} onClick={() => openLightbox(index)}>
                            {item?.target_id && (
                                <MediaComponent target_id={item.target_id}
                                                imagestyle="small_large_photoalbums_134_172_"/>
                            )}
                        </div>
                    ))}
                </div>

                {/* Lightbox */}
                {lightboxOpen && (
                    <div className="lightbox">
                        <div className="lightbox-content flex sm:justify-center justify-between">
                            <button onClick={handlePrev} className="button-prev">&#8249;</button>
                            <MediaComponent
                                target_id={albumsNode.field_photos[selectedImageIndex]?.target_id}
                                imagestyle="large"
                            />
                            <button onClick={handleNext} className="button-next">&#8250;</button>

                            <button onClick={closeLightbox} className="button-close">&#10005;</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default PhotoAlbumsFullPage;
