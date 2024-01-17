import {useParams} from "react-router-dom";
import Paragraph from "../components/Paragraph/Paragraph.jsx";
import MetaTags from "../components/Common/MetaTags.jsx";
import {useGeneralInfoPageQuery} from "../services/api.js";
import {useContext, useEffect} from "react";
import {LoadingContext} from "../context/loading-context.jsx";

function GeneralInformationPage() {
    const {alias} = useParams();
    const { data:  general, isFetching } = useGeneralInfoPageQuery({ page: `${alias}`});
    const {setLoadingValue} = useContext(LoadingContext)
    useEffect(() => {
        if(!isFetching){setLoadingValue({ GeneralInformationPage: true });} else { setLoadingValue({ GeneralInformationPage: false } )}
    }, [isFetching]);
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