import useDrupalData from "../../services/api.jsx";
import ImageComponent from "../../components/ImageComponent.jsx";
import { format } from 'date-fns';
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import {useState, useEffect} from 'react'

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
    const {data: data3, isLoading: isLoading3, error: error3} = useDrupalData('jsonapi/views/events_coming_soon/block_1');
    const {data: data4, isLoading: isLoading4, error: error4} = useDrupalData('jsonapi/views/slider/block_1');
    const {data: data5, isLoading: isLoading5, error: error5} = useDrupalData('/jsonapi/views/polls/block_1');
    const {data: data6, isLoading: isLoadin6, error: error6} = useDrupalData('/poll-vote-result/rest-export/1');

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    };

    const [ip, setIP] = useState("");

    //creating function to load ip address from the API
    // const getData = async () => {
    //   const res = await axios.get("https://geolocation-db.com/json/");
    //   console.log(res.data);
    //   setIP(res.data.IPv4);
    // };

    // Updated Code

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


        console.log('Poll ID:', pollId);
        console.log('Current Timestamp:', currentTimestamp);
        console.log('Current Hostname:', currentHostname);


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
                // Handle the server response
                console.log(response.data, response);
            })
            .catch((error) => {
                // Handle errors
                console.error(error);
            });

        // Your custom logic goes here
        console.log('test', event.target);

        // Optionally, you can use the FormData API to access form data
         // 'choice' corresponds to the name attribute of the radio inputs

        console.log('Selected value:', selectedValue);
        console.log('Form data:', formData);
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
    // console.log(dataImage)

    return (
        <div>
            <Slider {...settings}>
                {data4?.data?.map((slide) => (
                    <div key='test'>
                        <h3>{slide?.attributes?.info}</h3>
                        <ImageComponent url={`jsonapi/block_content/slider/${slide?.id}/field_image`} imageStyle={'news_275x185'}/>
                        <div dangerouslySetInnerHTML={{ __html: slide?.attributes?.field_description?.value }} />
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
                            <div><div><img src='/src/assets/home-tick.png'/></div>Читати далі</div>
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
                        <div><div>{format(new Date(event?.attributes?.field_duration?.value), 'dd MMMM HH:mm')}</div>
                            <div>{format(new Date(event?.attributes?.field_duration?.end_value), 'dd MMMM HH:mm')}</div>
                        </div>
                        <ImageComponent url={`jsonapi/node/events/${event?.id}/field_image`} imageStyle={'news_275x185'}/>
                        <div><h3>{event?.attributes?.title}</h3></div>
                        <div dangerouslySetInnerHTML={{ __html: truncateText(event?.attributes?.field_description?.value, 150) }} />
                        <div><a href='/'><img src="/src/assets/long-arrow-right.png" alt='link'/></a></div>
                    </div>
                ))}
            </div>
            <div className='homepage-bottom'>
                {data5?.data?.map((poll) => (
                    <div key='test'>
                        <button onClick={handleButtonClick}>Перемикати форми</button>
                        {showForm1 ? (
                        <form onSubmit={handleSubmit1}>
                            <input type="hidden" name="pollId" value={poll?.attributes?.drupal_internal__id} />
                            {poll?.relationships?.choice?.data?.map((choice) => (
                                <div key={choice.id}>
                                    <input
                                        type="radio"
                                        name="choice"  // Add a name attribute to group the radio inputs
                                        value={choice?.meta?.drupal_internal__target_id}
                                    />
                                    <label>{choice?.meta?.drupal_internal__target_id}</label>
                                </div>
                            ))}
                            <button type="submit">Надіслати</button>
                        </form>
                        ) : (
                            <div>
                            {data6?.data?.map((choice) => (
                                <div key={choice.id}>
                                    {choice?.attributes?.vote_count}
                                </div>
                            ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;