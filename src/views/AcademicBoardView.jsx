import StaffView from "./StaffView/StaffView.jsx";
import MetaTags from "../components/Common/MetaTags.jsx";
import {useLocation} from "react-router-dom";
import { useStaffQuery} from "../services/api.js";

export default function AcademicBoardView() {

    const {  data: academicBoardViewsData} =  useStaffQuery({endpoint: `page_2`});
    const location = useLocation();
    const currentPath = location.pathname;
    return (
        <>
            <MetaTags type={"view"} data={academicBoardViewsData} viewUrl={currentPath}/>
            <StaffView data={academicBoardViewsData}/>
        </>
    );
}




