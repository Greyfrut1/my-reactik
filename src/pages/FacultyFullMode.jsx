import {useParams} from "react-router-dom";
import useDrupalData from "../services/api.jsx";
import ImageComponent from "../components/ImageComponent.jsx";
import Paragraph from "../components/Paragraph.jsx";

function FacultyFullMode(){
    const { alias } = useParams();
    const {data: faculty} = useDrupalData(`faculty/${alias}?_format=json`)
    return (
        <>
            <div>{faculty?.title?.[0]?.value}</div>
            {faculty?.field_image?.[0]?.target_id &&(
                <div><ImageComponent imagestyle={"thumbnail"} alt={""} url={faculty?.field_image?.[0]?.target_id} /></div>
            )}
            <div><a href={`https://www.google.com.ua/maps/search/${faculty?.field_location?.[0]?.value}`}>{faculty?.field_location?.[0]?.value}</a></div>
            <div><a href={`mailto:${faculty?.field_email?.[0]?.value}`}>{faculty?.field_email?.[0]?.value}</a></div>
            {faculty?.field_phone_number?.map((phone, index) => (
                <div key={index}>
                    <a href={`tel:${phone.value}`}>{phone.value}</a>
                </div>
            ))}
            <div><a href={faculty?.field_wiki?.[0]?.uri}>WIKI</a></div>
            <div dangerouslySetInnerHTML={{ __html: faculty?.field_about_the_faculty?.[0]?.value}} />
            <div className={"Paragraphs"}>
                {faculty?.field_content?.map((item, index) => (
                    <div className={"section"} key={index}>
                        <Paragraph target_id={item?.target_id}/>
                    </div>
                ))}
            </div>
        </>
    );
}
export default FacultyFullMode