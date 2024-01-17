import {Link, useParams} from "react-router-dom";
import Orcid from "../../assets/orcid.png";
import Scholar from "../../assets/scholar.png";
import Scopus from "../../assets/scopus.png";
import Wiki from "../../assets/wikisnu-new.png";
import React, {useContext, useEffect} from "react";
import ContactInformation from "../../components/Common/ContactInformation.jsx";
import MetaTags from "../../components/Common/MetaTags.jsx";
import './StaffPage.scss';
import {useStaffPageQuery} from "../../services/api.js";
import {LoadingContext} from "../../context/loading-context.jsx";

export default function StaffPage(){
    const { alias } = useParams();
    const { data:  staff, isFetching } = useStaffPageQuery({ page: `${alias}`});
    const {setLoadingValue} = useContext(LoadingContext)
    useEffect(() => {
        if(!isFetching){setLoadingValue({ StaffPage: true });} else { setLoadingValue({ StaffPage: false } )}
    }, [isFetching]);
    return (
        <>
            <MetaTags  type={"content"} data={staff} />
            <div className={"staff container"}>
                {staff?.field_image?.[0]?.target_id && (
                    <img src={staff?.field_image?.[0]?.url}
                         alt={staff?.field_image?.[0]?.alt}/>
                )}
                <h2 className={"staff-title"}>{staff?.title?.[0]?.value}</h2>

                <div className={"staff-info"}>
                <div className={"staff-info__general"}>
                        <p className={"staff-info__general-position"}>{staff?.field_position_and_rank?.[0]?.value}</p>
                        <ContactInformation data={staff} type={"node"}/>
                    </div>
                    <div className={"staff-info__sources"}>
                        <div className="staff-info__sources-link">
                            <img src={Wiki} alt={"wiki"}/>
                            <Link to={staff?.field_wiki?.[0]?.uri}>
                                Wiki page
                            </Link>
                        </div>
                        <div className="staff-info__sources-link">
                            <img src={Orcid} alt={"orcid"}/>
                            <Link to={staff?.field_orcid_id?.[0]?.uri}>
                                Orcid id
                            </Link>
                        </div>
                        <div className="staff-info__sources-link">
                            <img src={Scopus} alt={"scopus"}/>
                            <Link to={staff?.field_scopus?.[0]?.uri}>
                                Scopus
                            </Link>
                        </div>
                        <div className="staff-info__sources-link">
                            <img src={Scholar} alt={"scholar"}/>
                            <Link to={staff?.field_google_scholar?.[0]?.uri}>
                                Google Scholar
                            </Link>
                        </div>
                    </div>
                </div>

                <div className={"staff-wikipedia"}>
                    {staff?.field_links?.map((item, index) => (
                        <div className={"staff-wikipedia__block"} key={index}>
                            <Link className="staff-wikipedia__block-link" to={item.uri}>
                                {item.title}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}