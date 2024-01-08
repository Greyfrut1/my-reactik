import {useParams} from "react-router-dom";
import useDrupalData from "../services/api.jsx";
import Paragraph from "../components/Paragraph/Paragraph.jsx";
import Metatags from "../components/Common/MetaTags.jsx";
function GeneralInformation(){
    const { alias } = useParams();
    const {data: general} = useDrupalData(`general-information/${alias}?_format=json`)
    return(
        <>
            {general &&(
                <Metatags type={"content"} data={general}  />
            )}
            <div className={"container"}>
            <div className={"paragraphs"}>
                    {general?.field_content?.map((item, index) => (
                        <Paragraph key={index} target_id={item?.target_id}/>
                    ))}
                </div>
            </div>
        </>
    );
}

export default GeneralInformation