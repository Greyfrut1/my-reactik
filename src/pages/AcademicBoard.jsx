import StaffViews from "../components/StaffViews.jsx";
import useDrupalData from "../services/api.jsx";

function Rectorate() {

    const {
        data: academicBoardViewsData
    } = useDrupalData(`/jsonapi/views/administrative_units/page_2`);

    return (
        <StaffViews data={academicBoardViewsData}/>
    );
}

export default Rectorate;




