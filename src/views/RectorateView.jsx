import StaffView from "./StaffView/StaffView.jsx";
import MetaTags from "../components/Common/MetaTags.jsx";
import {useLocation} from "react-router-dom";
import { useStaffQuery} from "../services/api.js";
import {useContext, useEffect} from "react";
import {LoadingContext} from "../context/loading-context.jsx";

function RectorateView() {
    const {  data: rectorateViewsData, isFetching} =  useStaffQuery({endpoint: `page_1`});
    const location = useLocation();
    const currentPath = location.pathname;
    const {setLoadingValue} = useContext(LoadingContext)
    useEffect(() => {
        if(!isFetching){setLoadingValue({ RectorateView: true });} else { setLoadingValue({ RectorateView: false } )}
    }, [isFetching]);
    return (
        <>
            <MetaTags type={"view"} data={rectorateViewsData} viewUrl={currentPath}/>
            <StaffView data={rectorateViewsData}/>
        </>

    );
}

export default RectorateView;




