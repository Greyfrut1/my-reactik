import {useParams} from "react-router-dom";
import MetaTags from "../../components/Common/MetaTags.jsx";
import {useEnsemblesPageQuery} from "../../services/api.js";

export default function EnsemblesPage(){
    const { alias } = useParams();
    const { data:  ensembles } =  useEnsemblesPageQuery({ page: `${alias}`});
    return(
        <>
            <MetaTags type={"content"} data={ensembles}/>
            {/*280X280*/}
            <img src={ensembles?.field_image?.[0]?.url} alt={ensembles?.field_image?.[0]?.alt}/>
            <div dangerouslySetInnerHTML={{__html: ensembles?.field_description?.[0]?.processed}}/>
        </>
    );
}