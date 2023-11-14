import useDrupalData from "../services/api.jsx";

function DynamicDataFeed({ id, type }){
    const {data:feedData} = useDrupalData(`/jsonapi/views/news_in_block/${type}?views-argument[0]=${id}`)
    return(
        <>
            <h1>Last {type}</h1>
            {feedData?.data?.map((item) =>(
                <div key={item?.attributes?.drupal_internal__nid}>
                    <a href={item?.attributes?.path?.alias}>{item.attributes.title}</a>
                </div>
            ))}
        </>
    );
}
export default DynamicDataFeed