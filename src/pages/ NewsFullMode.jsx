import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useDrupalData from "../services/api.jsx";

function NewsFullMode() {
    const { newsalias } = useParams();
    const { data: newsNode, isLoading: newsNodeIsLoading, error: newsNodeError } = useDrupalData(`news/${newsalias}?_format=json`);
    return (
        <>
            {newsNode.title?.map((item, index) => (
                <div className="w-full" key={index}>
                    <p>title : {item.value}</p>
                </div>
            ))}
            {newsNode.field_description?.map((item, index) => (
                <div className="w-full" key={index}>
                    <p dangerouslySetInnerHTML={{ __html: `field_description: ${item.value}` }}></p>
                </div>
            ))}
        </>
    );
}

export default NewsFullMode;
