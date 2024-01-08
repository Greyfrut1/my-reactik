import StaffViews from "../../views/Staff/StaffViews.jsx";
import useDrupalData from "../../services/api.jsx";
import Metatags from "../../components/Common/MetaTags.jsx";
import {useLocation} from "react-router-dom";

function Rectorate() {

    const {
        data: academicBoardViewsData
    } = useDrupalData(`/jsonapi/views/administrative_units/page_2`);
    const location = useLocation();
    const currentPath = location.pathname;
    return (
        <>
            <Metatags type={"view"} data={academicBoardViewsData} viewUrl={currentPath}/>
            <StaffViews data={academicBoardViewsData}/>
        </>
    );
}

export default Rectorate;




