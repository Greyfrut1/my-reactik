import useDrupalData from "../services/api.jsx";
import ImageComponent from "../components/ImageComponent.jsx";
import useLanguagePrefix from "../services/languagePrefix.jsx";

function Faculties() {
    const {data: facultyData} = useDrupalData('jsonapi/views/faculties/page_1')
    const languagePrefix = useLanguagePrefix()
    console.log(facultyData)
    return (
        <div className={"container flex justify-between flex-wrap"}>
            {facultyData?.data?.map((item, index) => (
                <div className={"faculty_item flex"} key={index}>
                    <div>
                        <a href={`/${languagePrefix}${item?.attributes?.path?.alias}`}>
                            <ImageComponent imagestyle={"thumbnail"} alt={""} url={item?.relationships?.field_image?.data?.meta?.drupal_internal__target_id} />
                        </a>
                    </div>
                    <div>
                        <div><a href={`/${languagePrefix}${item?.attributes?.path?.alias}`}>{item?.attributes?.title}</a>
                        </div>
                        <div><a href={`https://www.google.com.ua/maps/search/${item?.attributes?.field_location}`}>{item?.attributes?.field_location}</a></div>
                        <div><a href={`mailto:${item?.attributes?.field_email}`}>{item?.attributes?.field_email}</a></div>
                        {item.attributes?.field_phone.map((phone, index) => (
                            <div key={index}>
                                <a href={`tel:${phone}`}> {phone} </a>
                            </div>

                        ))}
                        <a href={item?.attributes?.field_wiki?.uri}>WIKI</a>
                    </div>
                </div>
            ))}
        </div>

    );
}

export default Faculties