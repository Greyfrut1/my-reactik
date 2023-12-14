import {useParams} from "react-router-dom";
import useDrupalData from "../services/api.jsx";
import Paragraph from "../components/Paragraph.jsx";

function GeneralInformation(){
    const { alias } = useParams();
    const {data: general} = useDrupalData(`general-information/${alias}?_format=json`)
    return(
        <>
            <div className={"Paragraphs"}>
                {general?.field_content?.map((item, index) => (
                    <div className={"section"} key={index}>
                        <Paragraph target_id={item?.target_id}/>
                    </div>
                ))}
            </div>
        </>
    );
}

export default GeneralInformation