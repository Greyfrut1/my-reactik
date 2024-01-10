import {useEnsemblesViewQuery} from "../../services/api.jsx";
import MetaTags from "../../components/Common/MetaTags.jsx";
import {useLocation} from "react-router-dom";
import React from "react";

export default function EnsemblesPage(){
    const { data:  ensembles } = useEnsemblesViewQuery();
    const location = useLocation();
    const currentPath = location.pathname;
    return (
        <>
            <MetaTags type={"view"} data={ensembles} viewUrl={currentPath}/>
            {ensembles?.rows?.map((item, index)=> (
                <div key={index}>
                    <div dangerouslySetInnerHTML={{__html: item?.title}}/>
                    <img src={item?.field_image?.image_style_uri?.['280x280']}
                         alt={item?.field_image?.meta?.alt}/>
                    <div dangerouslySetInnerHTML={{__html: item?.field_description}}/>
                    <div dangerouslySetInnerHTML={{__html: item?.view_node}}/>
                </div>
            ))}
        </>
    )
}