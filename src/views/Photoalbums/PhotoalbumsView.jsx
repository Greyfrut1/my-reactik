import React, {useEffect, useState} from "react";
// import Pager from "../Pager.jsx";
import {useWindowSize} from "react-use";
import {usePhotoAlbumsQuery} from "../../services/api.jsx";
import useLanguagePrefix from "../../services/languagePrefix.jsx";
import Metatags from "../../components/Common/MetaTags.jsx";
import {useLocation} from "react-router-dom";
import './PhotoalbumsView.scss';

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
            <Metatags type={"view"} data={apiUrl} viewUrl={currentPath}/>
            <div className={"albums container"}>
                <div className={"albums-view flex flex-wrap xl:justify-start justify-center"}>
                    {albumsData?.data?.map((item, index) => (
                        <div className={"albums-card"} key={index}>
                            <a className={"albums-card__title"}
                               href={`/${languagePrefix}${item?.attributes?.path?.alias}`}>{item.attributes.title}</a>
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
