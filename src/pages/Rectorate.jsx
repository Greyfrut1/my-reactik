import useDrupalData from "../services/api.jsx";
import StaffViews from "../components/StaffViews.jsx";

function Rectorate() {

    const {
        data: rectorateViewsData
    } = useDrupalData(`/jsonapi/views/administrative_units/page_1`);

    return (
        <StaffViews data={rectorateViewsData}/>
    );
}

export default Rectorate;




