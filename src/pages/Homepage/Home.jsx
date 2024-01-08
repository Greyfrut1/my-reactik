import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PollsBlock from "../../blocks/Polls/PollsBlock.jsx";
import YoutubeEmbed from "../../components/Common/YoutubeEmbed.jsx";
import ActualNewsBlock from "../../blocks/News/ActualNewsBlock.jsx";
import MainSlider from "../../sliders/MainSlider/MainSlider.jsx";
import EventsSlider from "../../sliders/EventsSlider/EventsSlider.jsx";
import {Link} from "react-router-dom";
import {
    useYoutubeBlockQuery,
} from '../../services/api';
import './Homepage.scss';
import LastNewsSlider from "../../sliders/LastNewsSlider/LastNewsSlider.jsx";
import useLanguagePrefix from "../../services/languagePrefix.jsx";

import {useEffect, useState} from "react";
import MetaTags from "../../components/Common/MetaTags.jsx";
import InfrastructureBlock from "../../blocks/InfrastructureBlock/InfrastructureBlock.jsx";

export default function HomePage() {
    const {data: youtubeBlockData} = useYoutubeBlockQuery();
    const [pageWidth, setPageWidth] = useState("100%");
    const langPrefix = useLanguagePrefix();
    useEffect(() => {
        setPageWidth(window.innerWidth > 900 ? "350px" : "300px");
    }, []);
    return (
        <>
            <MetaTags type={"front"}/>
            <MainSlider/>
            <ActualNewsBlock/>
            <LastNewsSlider/>
            <EventsSlider/>
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
                <InfrastructureBlock/>
            </div>
        </>
    );
}
