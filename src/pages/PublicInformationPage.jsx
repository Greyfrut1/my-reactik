import MetaTags from "../components/Common/MetaTags.jsx";
import {useLocation} from "react-router-dom";
import {usePublicInfoQuery, usePublicInfoViewQuery} from "../services/api.js";

export default function PublicInformationPage(){
    const { data:  publicInformation } = usePublicInfoQuery();
    const { data:  publicInformationTitle } = usePublicInfoViewQuery({ endpoint: 'block_1'});

    const location = useLocation();
    const currentPath = location.pathname;

    return(
        <div className="public-information information-view container">
            {publicInformationTitle && currentPath && (
                <MetaTags type={"view"} data={publicInformationTitle} viewUrl={currentPath}/>
            )}
            {publicInformation?.rows?.map((item, index) => (
                    <div className="information-view__items" key={index}>
                        <h2 className="information-view__items-title">{item?.title}</h2>
                        <p className="information-view__items-body">{item?.field_body}</p>
                        <button type="button" className="information-view__items-button" dangerouslySetInnerHTML={{__html: item?.view_node}}/>
                    </div>
                )
            )}
        </div>
    );
}