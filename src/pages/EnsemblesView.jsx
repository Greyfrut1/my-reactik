import useDrupalData from "../services/api.jsx";
import ImageComponent from "../components/ImageComponent.jsx";

function EnsemblesView(){
    const {data: ensembles} = useDrupalData(`ensembles`)
    return (
        <>
            {ensembles?.rows?.map((item, index)=> (
                <div key={index}>
                    <div dangerouslySetInnerHTML={{__html: item?.title}} />
                    <ImageComponent alt={item?.field_image_1} imagestyle={"280x280"} url={item?.field_image} />
                    <div dangerouslySetInnerHTML={{__html: item?.field_description}} />
                    <div dangerouslySetInnerHTML={{__html: item?.view_node}} />
                </div>
            ))}
        </>
    )
}
export default EnsemblesView