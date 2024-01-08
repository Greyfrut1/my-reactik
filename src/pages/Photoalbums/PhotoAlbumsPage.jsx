import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useDrupalData from "../../services/api.jsx";
import LightBox from "../../components/Image/LightBox.jsx";
import Metatags from "../../components/Common/MetaTags.jsx";
import './PhotoalbumsPage.scss';

function PhotoAlbumsPage() {
    const { alias } = useParams();
    const [albumsNode, setAlbumsNode] = useState(null);

    const {
        data: albumsNodeData
    } = useDrupalData(`photoalbums/${alias}?_format=json`);

    useEffect(() => {
        if (albumsNodeData) {
            setAlbumsNode(albumsNodeData);
        }
    }, [albumsNodeData]);

    return (
        <>
            <Metatags type={"content"} data={albumsNodeData} />
            <div className="albums container">
                {albumsNode?.title?.map((item, index) => (
                    <div className="album-title" key={index}>
                        <h1>{item.value}</h1>
                    </div>
                ))}
                <LightBox data={albumsNodeData}/>
            </div>
        </>
    );
}

export default PhotoAlbumsPage;
