import MetaTags from "../components/Common/MetaTags.jsx";
import {useLocation} from "react-router-dom";
import {useAccreditationQuery, usePublicInfoViewQuery} from "../services/api.js";

function AccreditationPage(){
    const { data: accreditationView } = useAccreditationQuery;
    const { data:  accreditationTitle } = usePublicInfoViewQuery({ endpoint: 'block_2'});

    const location = useLocation();
    const currentPath = location.pathname;
    return(
        <>
            {accreditationTitle && currentPath && (
                <MetaTags type={"view"} data={accreditationTitle} viewUrl={currentPath}/>
            )}
            {accreditationView?.rows?.length > 0 && accreditationView?.rows?.map((item, index) => (
                    <div key={index}>
                        <div dangerouslySetInnerHTML={{__html: item?.title}}/>
                        <div dangerouslySetInnerHTML={{__html: item?.view_node}}/>
                    </div>
                )
            )}
        </>
    );
}
export default AccreditationPage