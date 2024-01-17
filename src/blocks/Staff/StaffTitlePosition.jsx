import useLanguagePrefix from "../../services/languagePrefix.jsx";
import PropTypes from "prop-types";
import {useNodeQuery} from "../../services/api.js";
import {Link} from "react-router-dom";
import {useContext, useEffect} from "react";
import {LoadingContext} from "../../context/loading-context.jsx";


function StaffTitlePosition({ staff_id }){
    const languagePrefix = useLanguagePrefix();
    const { data:  position, isFetching } =  useNodeQuery({ nid: `${staff_id}`});
    const {setLoadingValue} = useContext(LoadingContext)
    useEffect(() => {
        if(!isFetching){setLoadingValue({ StaffTitlePosition: true });} else { setLoadingValue({ StaffTitlePosition: false } )}
    }, [isFetching]);
    return(
        <>
            <a href={`/${languagePrefix}${position?.path?.[0]?.alias}`}>{position?.title?.[0]?.value}</a>
            {position?.field_position_and_rank?.[0]?.value}
        </>
    );
}
StaffTitlePosition.propTypes = {
    staff_id: PropTypes.number.isRequired,
};
export default StaffTitlePosition;