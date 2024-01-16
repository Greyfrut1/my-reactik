import React, {useEffect, useState} from "react";
import {useWindowSize} from "react-use";
import useLanguagePrefix from "../../services/languagePrefix.jsx";
import MetaTags from "../../components/Common/MetaTags.jsx";
import {useLocation} from "react-router-dom";
import './PhotoAlbumsView.scss';
import {usePhotoAlbumsQuery} from "../../services/api.js";

function PhotoAlbumsView() {
    const {data: albumsData} = usePhotoAlbumsQuery();
    const languagePrefix = useLanguagePrefix()

    const size = useWindowSize();
    const [imageStyle, setImageStyle] = useState('');

    useEffect(() => {
        if (size.width < 480) {
            setImageStyle('thumbnail');
        } else {
            setImageStyle('small_large_photoalbums_134_172_');
        }
    }, [size.width]);
    const location = useLocation();
    const currentPath = location.pathname;
    return (
        <>
            <MetaTags type={"view"} data={albumsData} viewUrl={currentPath}/>
            <div className={"albums container"}>
                <div className={"albums-view"}>
                    {albumsData?.data?.map((item, index) => (
                        <div className={"albums-card"} key={index}>
                            <a className={"albums-card__title"}
                               href={`/${languagePrefix}${item?.path?.alias}`}>{item?.title}</a>
                            <img className="albums-card__img"
                                 src={item?.field_image?.image_style_uri?.['small_large_photoalbums_134_172_']}
                                 alt={item?.field_image?.meta?.alt}/>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default PhotoAlbumsView;
