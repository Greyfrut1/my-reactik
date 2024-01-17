import { useParams } from "react-router-dom";
import LightBox from "../../components/Image/LightBox.jsx";
import MetaTags from "../../components/Common/MetaTags.jsx";
import './PhotoalbumsPage.scss';
import {usePhotoAlbumsPageQuery} from "../../services/api.js";
import {useContext, useEffect} from "react";
import {LoadingContext} from "../../context/loading-context.jsx";

function PhotoAlbumsPage() {
    const { alias } = useParams();
    const { data:  albumsNodeData, isFetching } = usePhotoAlbumsPageQuery({ page: `${alias}`});
    const {setLoadingValue} = useContext(LoadingContext)
    useEffect(() => {
        if(!isFetching){setLoadingValue({ PhotoAlbumsPage: true });} else { setLoadingValue({ PhotoAlbumsPage: false } )}
    }, [isFetching]);
    return (
        <>
            <MetaTags type={"content"} data={albumsNodeData} />
            <div className="albums container">
                <h1 className="albums-title">{albumsNodeData?.title?.[0]?.value}</h1>
                <LightBox data={albumsNodeData}/>
            </div>
        </>
    );
}

export default PhotoAlbumsPage;
