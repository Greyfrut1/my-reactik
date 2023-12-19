import useDrupalData from "../services/api.jsx";

function AccreditationView(){
    const {data: accreditationView} = useDrupalData(`accreditation`)
    return(
        <>
            {accreditationView?.rows?.length > 0 && accreditationView?.rows?.map((item, index) => (
                    <div key={index}>
                        <div dangerouslySetInnerHTML={{__html: item?.title}}/>
                        <div dangerouslySetInnerHTML={{__html: item?.view_node}}/>
                    </div>
                )
            )}
        </>
    );
}
export default AccreditationView