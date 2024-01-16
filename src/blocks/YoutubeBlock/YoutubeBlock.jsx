import {useYoutubeBlockQuery} from '../../services/api.js';
import {Link} from "react-router-dom";
import YoutubeEmbed from "../../components/Common/YoutubeEmbed.jsx";
import './YoutubeBlock.scss';

export default function FacebookBlock() {

    const {data: youtubeBlockData} = useYoutubeBlockQuery();
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