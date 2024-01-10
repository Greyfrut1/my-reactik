import React, { useState} from "react";
import MediaComponent from "./MediaComponent.jsx";
import './LightBox.scss';
function LightBox({data}) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const openLightbox = (index) => {
        setSelectedImageIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    const handlePrev = () => {
        setSelectedImageIndex((prevIndex) => (prevIndex === 0 ? data.field_photos.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setSelectedImageIndex((prevIndex) => (prevIndex === data.field_photos.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <>
            <div className="gallery">
                {data?.field_photos?.map((item, index) => (
                    <div className="gallery__img" key={index} onClick={() => openLightbox(index)}>
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
                            target_id={data.field_photos[selectedImageIndex]?.target_id}
                            imagestyle="large"
                        />
                        <button onClick={handleNext} className="button-next">&#8250;</button>

                        <button onClick={closeLightbox} className="button-close">&#10005;</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default LightBox;
