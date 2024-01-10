import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PollsBlock from "../../blocks/Polls/PollsBlock.jsx";
import ActualNewsBlock from "../../blocks/News/ActualNewsBlock.jsx";
import MainSlider from "../../sliders/MainSlider/MainSlider.jsx";
import EventsSlider from "../../sliders/EventsSlider/EventsSlider.jsx";
import LastNewsSlider from "../../sliders/LastNewsSlider/LastNewsSlider.jsx";
import MetaTags from "../../components/Common/MetaTags.jsx";
import InfrastructureBlock from "../../blocks/InfrastructureBlock/InfrastructureBlock.jsx";
import PhotoAlbumSlider from "../../sliders/PhotoAlbumSlider/PhotoAlbumSlider.jsx";
import FacebookBlock from "../../blocks/FacebookBlock/FacebookBlock.jsx";
import YoutubeBlock from "../../blocks/YoutubeBlock/YoutubeBlock.jsx";
import './HomePage.scss';

export default function HomePage() {
    return (
        <>
            <MetaTags type={"front"}/>
            <MainSlider/>
            <ActualNewsBlock/>
            <LastNewsSlider/>
            <EventsSlider/>
            <div className="homepage-bottom">
                <PollsBlock/>
                <InfrastructureBlock/>
                <PhotoAlbumSlider/>
                <FacebookBlock/>
                <YoutubeBlock/>
            </div>
        </>
    );
}
