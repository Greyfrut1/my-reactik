import StaffView from "./StaffView/StaffView.jsx";
import MetaTags from "../components/Common/MetaTags.jsx";
import {useLocation} from "react-router-dom";
import { useStaffQuery} from "../services/api.js";

function RectorateView() {
    const {  data: rectorateViewsData} =  useStaffQuery({endpoint: `page_1`});
    const location = useLocation();
    const currentPath = location.pathname;
    return (
        <>
            <MetaTags type={"view"} data={rectorateViewsData} viewUrl={currentPath}/>
            <StaffView data={rectorateViewsData}/>
        </>

    );
}

export default RectorateView;




