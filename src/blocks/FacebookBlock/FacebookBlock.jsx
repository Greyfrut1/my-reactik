import {useFacebookBlockQuery} from '../../services/api.js';
import {FacebookProvider, Page} from "react-facebook";
import {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import './FacebookBlock.scss';
import {LoadingContext} from "../../context/loading-context.jsx";

export default function FacebookBlock() {

    const {data:facebookBlockData, isFetching} = useFacebookBlockQuery();
    const [pageWidth, setPageWidth] = useState("100%");
    const {setLoadingValue} = useContext(LoadingContext)
    useEffect(() => {
        setPageWidth(window.innerWidth > 900 ? "350px" : "300px");
        if(!isFetching){setLoadingValue({ FacebookBlock: true });} else { setLoadingValue({ FacebookBlock: false } )}
    }, [isFetching]);
    return (
        <>
            {facebookBlockData?.data?.attributes?.field_link_to?.uri && <div className="facebook-block">
                <h3 className="facebook-block__title title"><Link
                    to={facebookBlockData?.data?.attributes?.field_link_to?.uri}>{facebookBlockData?.data?.attributes?.info}</Link>
                </h3>
                <FacebookProvider appId='1453142571919005'>
                    <Page width={pageWidth} height="450" href={facebookBlockData?.data?.attributes?.field_link_to?.uri} tabs="timeline"/>
                </FacebookProvider>
            </div>}
        </>
    )
}