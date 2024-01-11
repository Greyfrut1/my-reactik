import {useEntityDataQuery} from "../services/api.js";
import PropTypes from "prop-types";

export default function EntityTitle({endpoint}) {
    const {data} = useEntityDataQuery({endpoint: `${endpoint}`});
    return (<>{data?.data?.type === 'node--faculty' && (
        <>{data?.data?.attributes?.title}</>
    )}
        {data?.data?.type === 'node--staff' && (
            <>{data?.data?.attributes?.title}</>
        )}
        {(data?.data?.type === 'taxonomy_term--educational_level' || data?.data?.type === 'taxonomy_term--specialty' || data?.data?.type === 'taxonomy_term--main_disciplines') && (
            <>{data?.data?.attributes?.name}</>
        )}
    </>)


}

EntityTitle.propTypes = {
    endpoint: PropTypes.string.isRequired
};