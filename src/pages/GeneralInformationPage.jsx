import {useParams} from "react-router-dom";
import Paragraph from "../components/Paragraph/Paragraph.jsx";
import MetaTags from "../components/Common/MetaTags.jsx";
import {useGeneralInfoPageQuery} from "../services/api.js";


function GeneralInformationPage() {
    const {alias} = useParams();
    const { data:  general } = useGeneralInfoPageQuery({ page: `${alias}`});

    return (
        <>
            <MetaTags type={"content"} data={general}/>
            <div className={"paragraphs container"}>
                {general?.field_content?.map((item, index) => (
                    <Paragraph key={index} target_id={item?.target_id}/>
                ))}
            </div>
        </>
    );
}

export default GeneralInformationPage