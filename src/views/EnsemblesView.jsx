import {useEnsemblesViewQuery} from "../services/api.js";
import MetaTags from "../components/Common/MetaTags.jsx";
import {Link, useLocation} from "react-router-dom";
import React, {useContext, useEffect} from "react";
import ReadMore from "./ReadMore.jsx";
import useLanguagePrefix from "../services/languagePrefix.jsx";
import {LoadingContext} from "../context/loading-context.jsx";

export default function EnsemblesView(){
    const { data:  ensembles, isFetching } = useEnsemblesViewQuery();
    const location = useLocation();
    const languagePrefix = useLanguagePrefix();
    const currentPath = location.pathname;
    const {setLoadingValue} = useContext(LoadingContext)
    useEffect(() => {
        if(!isFetching){setLoadingValue({ EnsemblesView: true });} else { setLoadingValue({ EnsemblesView: false } )}
    }, [isFetching]);
    return (
        <>
            <MetaTags type={"view"} data={ensembles} viewUrl={currentPath}/>
            {ensembles?.data?.map((item, index)=> (
                <div key={index}>
                    <h2>{item?.title}</h2>
                    <img src={item?.field_image?.image_style_uri?.['280x280']}
                         alt={item?.field_image?.meta?.alt}/>
                    <div dangerouslySetInnerHTML={{__html: item?.field_description.summary}}/>
                    <a href={`/${languagePrefix}${item.path.alias}`}><ReadMore/></a>
                </div>
            ))}
        </>
    )
}