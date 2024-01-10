import {useFacebookBlockQuery} from '../../services/api.js';
import {FacebookProvider, Page} from "react-facebook";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import './FacebookBlock.scss';

export default function FacebookBlock() {

    const {data:facebookBlockData} = useFacebookBlockQuery();
    const [pageWidth, setPageWidth] = useState("100%");
    useEffect(() => {
        setPageWidth(window.innerWidth > 900 ? "350px" : "300px");
    }, []);
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