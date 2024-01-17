import {useParams} from "react-router-dom";
import MetaTags from "../../components/Common/MetaTags.jsx";
import {useEnsemblesPageQuery} from "../../services/api.js";
import {useContext, useEffect} from "react";
import {LoadingContext} from "../../context/loading-context.jsx";

export default function EnsemblesPage(){
    const { alias } = useParams();
    const { data:  ensembles, isFetching } =  useEnsemblesPageQuery({ page: `${alias}`});
    const {setLoadingValue} = useContext(LoadingContext)
    useEffect(() => {
        if(!isFetching){setLoadingValue({ EnsemblesPage: true });} else { setLoadingValue({ EnsemblesPage: false } )}
    }, [isFetching]);
    return(
        <>
            <MetaTags type={"content"} data={ensembles}/>
            {/*280X280*/}
            <img src={ensembles?.field_image?.[0]?.url} alt={ensembles?.field_image?.[0]?.alt}/>
            <div dangerouslySetInnerHTML={{__html: ensembles?.field_description?.[0]?.processed}}/>
        </>
    );
}