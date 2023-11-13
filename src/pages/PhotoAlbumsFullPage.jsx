import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import useDrupalData from "../services/api.jsx";
import ImageComponent from "../components/ImageComponent.jsx";
import LightBoxComponent from "../components/LightBoxComponent.jsx";

function PhotoAlbumsFullPage() {
    const navigate = useNavigate();
    const {albumsalias} = useParams();
    const [apiUrl, setApiUrl] = useState("/jsonapi/views/photoalbums_/block_1");
    const {
        data: albumsNode,
        isLoading: albumsNodeIsLoading,
        error: albumsNodeError,
    } = useDrupalData(`photoalbums/${albumsalias}?_format=json`);

    return (
        <div className="albums">
            {albumsNode.title?.map((item, index) => (
                <div className="w-full" key={index}>
                    <h1>{item.value}</h1>
                </div>
            ))}
            {albumsNode.field_photos?.map((item, index) => (
                <div key={index}>
                    <ImageComponent url={`jsonapi/media/${item.target_id}/edit?_format=json`} /><div>
                </div>

                </div>
            ))}

        </div>
    );
}

export default PhotoAlbumsFullPage;