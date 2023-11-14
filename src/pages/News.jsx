import DynamicDataBlocks from "../components/DynamicDataBlocks.jsx";
import ImageComponent from "../components/ImageComponent.jsx";

function News() {
    return (
        <>
            <DynamicDataBlocks
                type="news"
                endpoint={(date, category, currentPage) =>
                    `jsonapi/views/news/block_1?page=${currentPage}&views-filter[created]=${date}&views-filter[type_news]=${category}`
                }
                render={(item, index) => (
                    <div key={index}>
                        <a href={item?.attributes?.path?.alias}>{item.attributes.title}</a>
                        {item.relationships.field_image && (
                            <ImageComponent url={new URL(item.relationships.field_image.links.related.href).pathname}
                                            imagestyle="large"/>
                        )}
                        <p>{item?.attributes?.field_description?.summary}</p>
                    </div>
                )}
            />
        </>
    );
}

export default News;
