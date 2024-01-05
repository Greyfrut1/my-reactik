// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import React, {useState, useEffect} from 'react'
// import MapComponent from "../../components/Common/MapComponent.jsx";
// import {FacebookProvider, Page} from "react-facebook";
// import MainSlider from "../../components/Sliders/MainSlider.jsx";
// import ActualNewsBlock from "../../blocks/News/ActualNewsBlock.jsx";
// import LastNewsBlock from "../../blocks/News/LastNewsBlock.jsx";
// import EventsSlider from "../../components/Sliders/EventsSlider.jsx";
// import PollBlock from "../../blocks/Polls/PollsBlock.jsx";
// import AlbumsSlider from "../../components/Sliders/AlbumsSlider.jsx";
// import useLanguagePrefix from "../../services/languagePrefix.jsx";
// import YoutubeEmbed from "../../components/Common/YoutubeEmbed.jsx";
// import Metatags from "../../components/Common/Metatags.jsx";
//
// import {
//    useYoutubeBlockQuery,
// } from '../../services/api';
//
// function Homepage() {
//     const {
//         data: actualNewsData,
//     } = useDrupalData('jsonapi/views/actual_news/block_1');
//     const {
//         data: lastNewsData,
//     } = useDrupalData('jsonapi/views/last_news/block_1');
//     const {
//         data: eventsBlockData,
//     } = useDrupalData('jsonapi/views/events_coming_soon/block_1');
//     const {
//         data: sliderData,
//     } = useDrupalData('jsonapi/views/slider/block_1');
//     const {
//         data: pollBlockData,
//     } = useDrupalData('jsonapi/views/polls/block_1');
//     const {
//         data: pollResultData,
//     } = useDrupalData('poll-vote-result/rest-export/1');
//     const {
//         data: infrastructureBlockdata,
//     } = useDrupalData('jsonapi/views/infrastructure/block_1');
//     const {
//         data: sliderAlbumsData,
//     } = useDrupalData('/jsonapi/views/photoalbums_/block_1');
//     const {
//         data: facebookBlockData,
//     } = useDrupalData('jsonapi/block_content/block_link/9997e437-90d7-49d1-98c6-d8c11bb4db04');

//     const [pageWidth, setPageWidth] = useState("100%");
//     const langPrefix = useLanguagePrefix();
//     useEffect(() => {
//         setPageWidth(window.innerWidth > 900 ? "350px" : "300px");
//     }, []);
//
//     return (
//         <>
//
//             <Metatags type={"front"}/>
//             <MainSlider data={sliderData}/>
//             <div className="actual-news-block">
//                 <ActualNewsBlock data={actualNewsData}/>
//             </div>
//             <div className="last-news-block">
//                 <h2 className="last-news-block__block-title"><a
//                     href={`/${langPrefix}/news`}>{lastNewsData?.meta?.title}</a></h2>
//                 <LastNewsBlock data={lastNewsData}/>
//             </div>
//             <div className="events-slider">
//                 <h2 className="events-slider__block-title"><a
//                     href={`/${langPrefix}/events`}>{eventsBlockData?.meta?.title}</a></h2>
//                 <EventsSlider data={eventsBlockData}/>
//             </div>
//             <div className='homepage-bottom'>

//додала
//                 <div className="poll-block">
//                     <h3 className="poll-block__title title"><a href='#'>{pollBlockData?.meta?.title}</a></h3>
//                     <PollBlock pollData={pollBlockData} resultData={pollResultData}/>
//                 </div>
//
//                 {/*<div>{infrastructureBlockdata?.data?.[0]?.attributes?.field_location}</div>*/}
//                 {infrastructureBlockdata?.data?.[0]?.attributes?.field_location &&
//                     <div className="infrastructure-block">
//                         <h3 className="infrastructure-block__title title"><a
//                             href='#'>{infrastructureBlockdata?.meta.title}</a></h3>
//                         <div className="infrastructure-block__map-block">
//                             <MapComponent
//                                 containerStyle={{width: '350px', height: '450px'}}
//                                 address={infrastructureBlockdata?.data?.[0]?.attributes?.field_location}
//                             />
//                         </div>
//                     </div>}
//
//                 <div className="photoalbum-block">
//                     <h3 className="photoalbum-block__title title"><a
//                         href={`/${langPrefix}/photoalbums`}>{sliderAlbumsData?.meta?.title}</a></h3>
//                     <AlbumsSlider data={sliderAlbumsData}/>
//                 </div>
//
//                 {facebookBlockData?.data?.attributes?.field_link_to?.uri && <div className="facebook-block">
//                     <h3 className="facebook-block__title title"><a
//                         href={facebookBlockData?.data?.attributes?.field_link_to?.uri}>{facebookBlockData?.data?.attributes?.info}</a>
//                     </h3>
//                     <FacebookProvider appId='1453142571919005'>
//                         <Page width={pageWidth} height="450"
//                               href={facebookBlockData?.data?.attributes?.field_link_to?.uri} tabs="timeline"/>
//                     </FacebookProvider>
//                 </div>}
//                 {youtubeBlockData?.data?.attributes?.field_link_to?.uri && (
//                     <div className="youtube-block">
//                         <h3 className="youtube-block__title title"><a
//                             href={youtubeBlockData?.data?.attributes?.field_link_to?.uri}>{youtubeBlockData?.data?.attributes?.info}</a>
//                         </h3>
//                         <div className="youtube-block__video-block">
//                             <YoutubeEmbed embedId={youtubeBlockData?.data?.attributes?.field_link_to?.uri}/>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </>
//     );
// }
//
// export default Homepage;