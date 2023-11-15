import useDrupalData from "../../services/api.jsx";
import ImageComponent from "../../components/ImageComponent.jsx";
import {format} from 'date-fns';
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import React, {useState, useEffect} from 'react'
import ChoiceComponent from "../../components/ChoiceComponent.jsx";
import MapComponent from "../../components/MapComponent.jsx";
import {FacebookProvider, Page} from "react-facebook";
import YouTube from 'react-youtube';

function truncateText(text, maxLength) {
    if (text && text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    }
    return text;
}

function Home() {

    const [showForm1, setShowForm1] = useState(true);
    const handleButtonClick = () => {
        setShowForm1(!showForm1); // Перемикач форм
    };
    const {data: data, isLoading: isLoading, error: error} = useDrupalData('jsonapi/views/actual_news/block_1');
    const {data: data2, isLoading: isLoading2, error: error2} = useDrupalData('jsonapi/views/last_news/block_1');
    const {
        data: data3,
        isLoading: isLoading3,
        error: error3
    } = useDrupalData('jsonapi/views/events_coming_soon/block_1');
    const {data: data4, isLoading: isLoading4, error: error4} = useDrupalData('jsonapi/views/slider/block_1');
    const {data: data5, isLoading: isLoading5, error: error5} = useDrupalData('/jsonapi/views/polls/block_1');
    const {data: data6, isLoading: isLoadin6, error: error6} = useDrupalData('/poll-vote-result/rest-export/1');
    const {data: data7, isLoading: isLoadin7, error: error7} = useDrupalData('jsonapi/views/infrastructure/block_1');
    const {
        data: data8,
        isLoading: isLoadin8,
        error: error8
    } = useDrupalData('jsonapi/block_content/block_link/9997e437-90d7-49d1-98c6-d8c11bb4db04');
    const {
        data: data9,
        isLoading: isLoadin9,
        error: error9
    } = useDrupalData('jsonapi/block_content/block_link/4e904849-61c6-45d4-93de-89539abdf33a');

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    };

    const [ip, setIP] = useState("");
    const [videoId, setVideoId] = useState(null);

    useEffect(() => {
        const videoUrl = data9?.data?.attributes?.field_link_to?.uri;
        console.log(videoUrl)

        if (videoUrl) {  // Перевірка, щоб уникнути помилки, якщо videoUrl === undefined
            const videoIdRegex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
            const match = videoUrl.match(videoIdRegex);

            if (match) {
                const extractedVideoId = match[1];
                setVideoId(extractedVideoId);
            }
        }
    }, [data9]);

    const getData = async () => {
        const res = await axios.get("https://api.ipify.org/?format=json");
        console.log(res.data);
        setIP(res.data.ip);
    };

    useEffect(() => {
        //passing getData method to the lifecycle method
        getData();
    }, []);

    const handleSubmit1 = (event) => {

        event.preventDefault(); // Prevent the default form submission behavior

        const formData = new FormData(event.target);
        const selectedValue = formData.get('choice');
        const pollId = formData.get('pollId');
        const currentTimestamp = new Date().getTime();
        const currentHostname = window.location.hostname;


        const submitFormData = {
            chid: selectedValue,
            pid: pollId,
            uid: "0",
            hostname: ip,
            timestamp: Math.floor(currentTimestamp / 1000).toString(),
        };
        console.log(submitFormData)

        axios.post('http://128.140.43.32/poll-vote/post-data', submitFormData)
            .then((response) => {
                console.log(response.data, response);
            })
            .catch((error) => {
                console.error(error);
            });
    };


    // useEffect(() => {
    //     if (!isLoading && !isLoading2) {
    //         setIsDataLoaded(true);
    //     }
    // }, [isLoading, isLoading2]);
    //
    // if (!isDataLoaded) {
    //     return <div>Loading...</div>;
    // }
    //
    // if (error || error2) {
    //     return <div>Error: {error?.message || error2?.message}</div>;
    // }


    const totalVotes = data6?.data?.reduce((acc, choice) => acc + parseInt(choice?.attributes?.vote_count, 10), 0);


    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 0,
        },
    };

    return (
        <div>
            <Slider {...settings}>
                {data4?.data?.map((slide) => (
                    <div key='test'>
                        <h3>{slide?.attributes?.info}</h3>
                        <ImageComponent url={`jsonapi/block_content/slider/${slide?.id}/field_image`}
                                        imageStyle={'news_275x185'}/>
                        <div dangerouslySetInnerHTML={{__html: slide?.attributes?.field_description?.value}}/>
                        <a href='/'>Докладніше</a>
                    </div>
                ))}
            </Slider>
            <div>
                {data?.data?.map((article) => (

                    <div key={article.id}>
                        <ImageComponent url={`jsonapi/node/news/${article?.id}/field_image`}
                                        imageStyle={'news_275x185'}/>
                        <div><h3>{article?.attributes?.title}</h3></div>
                        <div><span>{article?.attributes?.field_description?.summary}</span></div>
                        <div>
                            <div><img src='/src/assets/home-tick.png'/></div>
                            Читати далі
                        </div>
                    </div>

                ))}
            </div>
            <div>
                <h2><a href='/'>Астуально</a></h2>
                <div>
                    {data2?.data?.map((news) => (
                        <div key={news.id}>
                            <ImageComponent url={`jsonapi/node/news/${news?.id}/field_image`}
                                            imageStyle={'news_275x185'}/>
                            <div><h3>{news?.attributes?.title}</h3></div>
                            <div><span>{news?.attributes?.field_description?.summary}</span></div>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h2><a href='/'>Незабаром</a></h2>
                {data3?.data?.map((event) => (
                    <div key={event.id}>
                        <div>
                            <div>{format(new Date(event?.attributes?.field_duration?.value), 'dd MMMM HH:mm')}</div>
                            <div>{format(new Date(event?.attributes?.field_duration?.end_value), 'dd MMMM HH:mm')}</div>
                        </div>
                        <ImageComponent url={`jsonapi/node/events/${event?.id}/field_image`}
                                        imageStyle={'news_275x185'}/>
                        <div><h3>{event?.attributes?.title}</h3></div>
                        <div
                            dangerouslySetInnerHTML={{__html: truncateText(event?.attributes?.field_description?.value, 150)}}/>
                        <div><a href='/'><img src="/src/assets/long-arrow-right.png" alt='link'/></a></div>
                    </div>
                ))}
            </div>
            <div className='homepage-bottom'>
                <h3><a href='#'>Обране опитування</a></h3>
                {data5?.data?.map((poll) => (
                    <div key='test'>
                        <div>{poll?.attributes?.question}</div>
                        {showForm1 ? (
                            <form onSubmit={handleSubmit1}>
                                <input type="hidden" name="pollId" value={poll?.attributes?.drupal_internal__id}/>
                                {poll?.relationships?.choice?.data?.map((choice, index) => (
                                    <div key={choice.id}>
                                        <input
                                            type="radio"
                                            name="choice"  // Add a name attribute to group the radio inputs
                                            value={choice?.meta?.drupal_internal__target_id}
                                        />
                                        <label><ChoiceComponent
                                            choiceId={poll.relationships?.choice?.data?.[index]?.id}/></label>
                                    </div>
                                ))}
                                <button type="submit">Надіслати</button>
                                <button onClick={handleButtonClick}>Переглянути результати</button>
                            </form>
                        ) : (
                            <div>
                                {data6?.data?.map((choice1, index) => {
                                    return (
                                        <div key={index}>
                                            <ChoiceComponent
                                                choiceId={data5?.data?.[0]?.relationships?.choice?.data?.[index]?.id}/>
                                            {/* Display the percentage */}
                                            {totalVotes > 0 && (
                                                <>
                                                    {((choice1?.attributes?.vote_count / totalVotes) * 100).toFixed(0)}%{' '}
                                                    <input
                                                        type="range"
                                                        min="0"
                                                        max="100"
                                                        value={((choice1?.attributes?.vote_count / totalVotes) * 100).toFixed(0)}
                                                        disabled
                                                    />
                                                    ({choice1?.attributes?.vote_count} vote{choice1?.attributes?.vote_count !== 1 ? 's' : ''})
                                                </>
                                            )}
                                        </div>
                                    )
                                })}
                                <div>Total votes: {totalVotes}</div>
                                <button onClick={handleButtonClick}>Переглянути опитування</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div>{data7?.data?.[0]?.attributes?.field_location}</div>
            {data7?.data?.[0]?.attributes?.field_location && <div>
                <h3><a href='#'>Інфрастркуктура</a></h3>
                <MapComponent address={data7?.data?.[0]?.attributes?.field_location}/></div>}
            {data8?.data?.attributes?.field_link_to?.uri && <div>
                <h3><a href='#'>{data8?.data?.attributes?.info}</a></h3>
                <FacebookProvider appId='1453142571919005'>
                    <Page href={data8?.data?.attributes?.field_link_to?.uri} tabs="timeline"/>
                </FacebookProvider>
            </div>}
            {data9?.data?.attributes?.field_link_to?.uri &&
                <div>
                    <h3><a href='#'>{data9?.data?.attributes?.info}</a></h3>
                    <YouTube videoId={videoId} opts={opts}/>
                </div>
            }

        </div>
    );
}

export default Home;