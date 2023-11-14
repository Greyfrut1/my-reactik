import DynamicDataBlocks from "../components/DynamicDataBlocks.jsx";
import ImageComponent from "../components/ImageComponent.jsx";

function Events() {
    return (
        <>
            <DynamicDataBlocks
                type="events"
                endpoint={(date, category) =>
                    `jsonapi/views/events/block_1?views-filter[created]=${date}&views-filter[field_type_target_id]=${category}`
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

export default Events;
