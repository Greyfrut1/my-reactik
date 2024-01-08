import useDrupalData from "../../services/api.jsx";
import StaffViews from "../../views/Staff/StaffViews.jsx";
import Metatags from "../../components/Common/MetaTags.jsx";
import {useLocation} from "react-router-dom";

function Rectorate() {

    const {
        data: rectorateViewsData
    } = useDrupalData(`/jsonapi/views/administrative_units/page_1`);
    const location = useLocation();
    const currentPath = location.pathname;
    return (
        <>
            <Metatags type={"view"} data={rectorateViewsData} viewUrl={currentPath}/>
            <StaffViews data={rectorateViewsData}/>
        </>

    );
}

export default Rectorate;




