import useDrupalData from "../services/api.jsx";
import Metatags from "../components/Metatags.jsx";
import {useLocation} from "react-router-dom";

function PublicInformation(){
    const {data: publicInformation} = useDrupalData(`public-information`)
    const {data: publicInformationTitle} = useDrupalData(`jsonapi/views/academic_publications/block_1`)
    const location = useLocation();
    const currentPath = location.pathname;
    console.log(publicInformationTitle)
    return(
        <div className="public-information information-view container">
            {publicInformationTitle && currentPath && (
                <Metatags type={"view"} data={publicInformationTitle} viewUrl={currentPath}/>
            )}
            {publicInformation?.rows?.length > 0 && publicInformation?.rows?.map((item, index) => (
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

export default PublicInformation