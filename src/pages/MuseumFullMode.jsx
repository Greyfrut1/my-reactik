import {useParams} from "react-router-dom";
import useDrupalData from "../services/api.jsx";
import ImageComponent from "../components/ImageComponent.jsx";
import ContactInformation from "../components/ContactInformation.jsx";
import Paragraph from "../components/Paragraph.jsx";

function BranchesFullMode(){
    const { alias } = useParams();
    const {data: branchesPage} = useDrupalData(`branches-and-representative-offices/${alias}?_format=json`)
    return (
        <div className={"museum container"}>
            <div className={"museum-info flex flex-row"}>
                {branchesPage?.field_image?.[0]?.target_id && (
                    <ImageComponent imagestyle={"dynamicdata_243x231"} alt={""}
                                    url={branchesPage?.field_image?.[0]?.target_id}/>
                )}
                <div className={"museum-info__contact"}>
                    <h2 className={"museum-info__contact-title"}>{branchesPage?.title?.[0]?.value}</h2>
                    <ContactInformation data={branchesPage} type={"node"}/>
                </div>
            </div>
            <div className={"Paragraphs"}>
                {branchesPage?.field_content?.map((item, index) => (
                    <div className={"section"} key={index}>
                        <Paragraph target_id={item?.target_id}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BranchesFullMode