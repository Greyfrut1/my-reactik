import useDrupalData from "../services/api.jsx";
import PropTypes from "prop-types";

function StaffTitlePosition({ staff_id }){
    const {data: position} = useDrupalData(`node/${staff_id}?_format=json`)
    return(
        <>
            <div>
                {position?.title?.[0]?.value}
            </div>
            <div>
                {position?.field_position_and_rank?.[0]?.value}
            </div>
        </>
    );
}
StaffTitlePosition.propTypes = {
    staff_id: PropTypes.number.isRequired,
};
export default StaffTitlePosition