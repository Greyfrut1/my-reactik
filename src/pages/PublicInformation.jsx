import useDrupalData from "../services/api.jsx";

function PublicInformation(){
    const {data: publicInformation} = useDrupalData(`public_information`)
    return(
        <>
            {publicInformation?.rows?.length > 0 && publicInformation?.rows?.map((item, index) => (
                    <div key={index}>
                        <span dangerouslySetInnerHTML={{__html: item?.title}}/>
                        <span dangerouslySetInnerHTML={{__html: item?.view_node}}/>
                        <span dangerouslySetInnerHTML={{__html: item?.field_body }}/>
                    </div>
                )
            )}
        </>
    );
}

export default PublicInformation