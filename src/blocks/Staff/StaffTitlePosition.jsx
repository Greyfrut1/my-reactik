import useLanguagePrefix from "../../services/languagePrefix.jsx";
import PropTypes from "prop-types";
import {useNodeQuery} from "../../services/api.js";
import {Link} from "react-router-dom";


function StaffTitlePosition({ staff_id }){
    const languagePrefix = useLanguagePrefix();
    const { data:  position } =  useNodeQuery({ nid: `${staff_id}`});

    return(
        <>
            <Link to={`/${languagePrefix}${position?.path?.[0]?.alias}`}>{position?.title?.[0]?.value}</Link>
            {position?.field_position_and_rank?.[0]?.value}
        </>
    );
}
StaffTitlePosition.propTypes = {
    staff_id: PropTypes.number.isRequired,
};
export default StaffTitlePosition;