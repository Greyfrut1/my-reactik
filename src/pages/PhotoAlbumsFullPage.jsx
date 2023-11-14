import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import useDrupalData from "../services/api.jsx";
import ImageComponent from "../components/ImageComponent.jsx";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

function PhotoAlbumsFullPage() {
    const navigate = useNavigate();
    const {albumsalias} = useParams();
    const [apiUrl, setApiUrl] = useState("/jsonapi/views/photoalbums_/block_1");
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const {
        data: albumsNode,
        isLoading: albumsNodeIsLoading,
        error: albumsNodeError,
    } = useDrupalData(`photoalbums/${albumsalias}?_format=json`);
    return (
        <div className="albums-container">
            {albumsNode.title?.map((item, index) => (
                <div className="album-title" key={index}>
                    <h1>{item.value}</h1>
                </div>
            ))}
            <div className="album-photo">
            {albumsNode.field_photos?.map((item, index) => (
                    <ImageComponent url={`jsonapi/media/image/${item.target_uuid}/field_media_image`} imagestyle={"photoalbums_"} />
            ))}
            </div>
            {/*MAIN LIGHTBOX*/}


        </div>
    );
}

export default PhotoAlbumsFullPage;