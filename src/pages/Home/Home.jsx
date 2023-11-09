import {useEffect, useState} from 'react'
import useDrupalData from "../../services/api.jsx";
import ImageComponent from "../../components/ImageComponent.jsx";

function Home() {
    const {data: data, isLoading: isLoading, error: error} = useDrupalData('jsonapi/views/actual_news/block_1');
    const {data: data2, isLoading: isLoading2, error: error2} = useDrupalData('jsonapi/views/last_news/block_1');

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
        </div>
    );
}

export default Home;