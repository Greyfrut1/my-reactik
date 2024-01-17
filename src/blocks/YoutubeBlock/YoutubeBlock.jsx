import {useYoutubeBlockQuery} from '../../services/api.js';
import {Link} from "react-router-dom";
import YoutubeEmbed from "../../components/Common/YoutubeEmbed.jsx";
import './YoutubeBlock.scss';
import {useContext, useEffect} from "react";
import {LoadingContext} from "../../context/loading-context.jsx";

export default function FacebookBlock() {
    const {data: youtubeBlockData, isFetching} = useYoutubeBlockQuery();
    const {setLoadingValue} = useContext(LoadingContext)
    useEffect(() => {
        if(!isFetching){setLoadingValue({ FacebookBlock: true });} else { setLoadingValue({ FacebookBlock: false } )}
    }, [isFetching]);
    return (
        <>
            {youtubeBlockData?.data?.attributes?.field_link_to?.uri && (
                <div className="youtube-block">
                    <h3 className="youtube-block__title"><Link
                        to={youtubeBlockData?.data?.attributes?.field_link_to?.uri}>{youtubeBlockData?.data?.attributes?.info}</Link>
                    </h3>
                    <div className="youtube-block__video-block">
                        <YoutubeEmbed embedId={youtubeBlockData?.data?.attributes?.field_link_to?.uri}/>
                    </div>
                </div>
            )}
        </>
    )
}