import PollsBlock from "../../blocks/Polls/PollsBlock.jsx";
import {
    useYoutubeBlockQuery,
} from '../../services/api';
import './Homepage.scss';
import YoutubeEmbed from "../../components/Common/YoutubeEmbed.jsx";
import {Link} from "react-router-dom";

export default function HomePage() {
    const { data: youtubeBlockData } = useYoutubeBlockQuery();

    return (
        <>
            <div className="homepage-bottom">
                <PollsBlock/>
                {youtubeBlockData?.data?.attributes?.field_link_to?.uri && (
                    <div className="youtube-block">
                        <h3 className="youtube-block__title title"><Link
                            to={youtubeBlockData?.data?.attributes?.field_link_to?.uri}>{youtubeBlockData?.data?.attributes?.info}</Link>
                        </h3>
                        <div className="youtube-block__video-block">
                            <YoutubeEmbed embedId={youtubeBlockData?.data?.attributes?.field_link_to?.uri}/>
                        </div>
                    </div>
                )}
            </div>

        </>
    );
}
