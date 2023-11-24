import useDrupalData from "../services/api.jsx";

function EntityTitle({endpoint}) {
    const {data: entityData} = useDrupalData(`/jsonapi/${endpoint}`)
    return (<>{entityData?.data?.type == 'node--faculty' && (
        <>{entityData?.data?.attributes?.title}</>
    )}
        {entityData?.data?.type == 'node--staff'  && (
            <>{entityData?.data?.attributes?.title}</>
        )}
        {(entityData?.data?.type == 'taxonomy_term--educational_level' || entityData?.data?.type == 'taxonomy_term--specialty' || entityData?.data?.type == 'taxonomy_term--main_disciplines') && (
            <>{entityData?.data?.attributes?.name}</>
        )}
    </>)


}

export default EntityTitle