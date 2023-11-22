import useDrupalData from "../services/api.jsx";

function TitleTaxonomy({id}){
    const {data: taxonomyData} = useDrupalData(`/jsonapi/taxonomy_term/educational_level/${id}`)

    return <span>{taxonomyData?.data?.attributes?.name}</span>
}
export default TitleTaxonomy