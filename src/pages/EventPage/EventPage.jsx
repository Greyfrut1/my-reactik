import DynamicDataFullMode from "../../views/DynamicData/DynamicDataFullMode.jsx";
import ImageComponent from "../../components/Image/ImageComponent.jsx";
import moment from 'moment';
import './EventsPage.scss';

export default function EventPage() {
    return (
        <DynamicDataFullMode
            types="events"
            endpoint={(alias) => `events/${alias}?_format=json`}
            renderFields={(data) => (
                <div className={"dynamic-data-full-mode-fields"}>
                    {data?.title?.map((item, index) => (
                        <div key={index}>
                            <h1 className={"block-title events-block-title"}>{item.value}</h1>
                        </div>
                    ))}
                    {data?.field_image?.map((item, index) => (
                        <div className={"flex "} key={index}>
                            <ImageComponent url={item?.target_id} imagestyle="width_862" alt={item?.alt}/>
                        </div>
                    ))}
                    {data?.field_description?.map((item, index) => (
                        <div key={index}>
                            <div className={"text-sm pb-[30px] field-description"} dangerouslySetInnerHTML={{ __html: `${item.value}` }}></div>
                        </div>
                    ))}
                    {data?.field_duration?.map((item, index) => (
                        <div key={index}>
                            <p className={"pt-[30px]"}>Start date: {moment(item.value).format('dddd, D MMMM YYYY - HH:mm')}</p>
                            <p className={"pt-5"}>End date: {moment(item.end_value).format('dddd, D MMMM YYYY - HH:mm')}</p>
                        </div>
                    ))}
                    {data?.field_location?.map((item, index) => (
                        <div className={"pt-5"} key={index}>
                            <div>Location: <a href={`https://www.google.com.ua/maps/search/${item.value}`}>{item.value}</a></div>
                        </div>
                    ))}
                </div>
            )}
        />
    );
}