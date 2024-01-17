import StaffView from "./StaffView/StaffView.jsx";
import MetaTags from "../components/Common/MetaTags.jsx";
import {useLocation} from "react-router-dom";
import { useStaffQuery} from "../services/api.js";
import {useContext, useEffect} from "react";
import {LoadingContext} from "../context/loading-context.jsx";

function Rectorate() {

    const {  data: academicBoardViewsData, isFetching} =  useStaffQuery({endpoint: `page_2`});
    const location = useLocation();
    const currentPath = location.pathname;
    const {setLoadingValue} = useContext(LoadingContext)
    useEffect(() => {
        if(!isFetching){setLoadingValue({ Rectorate: true });} else { setLoadingValue({ Rectorate: false } )}
    }, [isFetching]);
    return (
        <>
            <MetaTags type={"view"} data={academicBoardViewsData} viewUrl={currentPath}/>
            <StaffView data={academicBoardViewsData}/>
        </>
    );
}

export default Rectorate;




