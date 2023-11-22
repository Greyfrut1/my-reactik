import useDrupalData from "../services/api.jsx";

function TitleNode({id}){
    const {data: taxonomyData} = useDrupalData(`/node/${id}?_format=json`)

    return <>{taxonomyData?.title?.[0]?.value}</>
}
export default TitleNode