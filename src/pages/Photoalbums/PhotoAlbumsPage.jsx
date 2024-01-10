import { useParams } from "react-router-dom";
import {usePhotoAlbumsPageQuery} from "../../services/api.jsx";
import LightBox from "../../components/Image/LightBox.jsx";
import MetaTags from "../../components/Common/MetaTags.jsx";
import './PhotoalbumsPage.scss';

function PhotoAlbumsPage() {
    const { alias } = useParams();
    const { data:  albumsNodeData } = usePhotoAlbumsPageQuery({ page: `${alias}`});
    return (
        <>
            <MetaTags type={"content"} data={albumsNodeData} />
            <div className="albums container">
                <h1 className="album-title">{albumsNodeData?.title?.[0]?.value}</h1>
                <LightBox data={albumsNodeData}/>
            </div>
        </>
    );
}

export default PhotoAlbumsPage;
