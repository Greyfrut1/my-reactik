import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {useFooterDevelopmentByBlockQuery} from "../../services/api.jsx";
import LightBox from "../../components/Image/LightBox.jsx";
import MetaTags from "../../components/Common/MetaTags.jsx";
import './PhotoalbumsPage.scss';

function PhotoAlbumsPage() {
    const { alias } = useParams();
    const { data:  albumsNodeData } = useFooterDevelopmentByBlockQuery({page: `${alias}`});
    return (
        <>
            <MetaTags type={"content"} data={albumsNodeData} />
            <div className="albums container">
                {albumsNodeData?.title?.map((item, index) => (
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
