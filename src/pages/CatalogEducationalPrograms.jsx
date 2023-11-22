import useDrupalData from "../services/api.jsx";
import TitleTaxonomy from "../components/TitleTaxonomy.jsx";
import TitleNode from "../components/TitleNode.jsx";

function CatalogEducationalPrograms() {
    const {data: educationalProgramsData} = useDrupalData(`/jsonapi/views/satalog_of_educational_programs/block_1?views-filter[field_form_educations_value]=All&views-filter[field_educational_level_target_id]=All&views-filter[field_validity_value]=All&views-filter[field_faculty_target_id]=All`)
    console.log(educationalProgramsData)
    return <>
        <table>
            <thead>
            <tr>
                <th>Title</th>
                <th>Format</th>
                <th>Level</th>
                <th>Faculty</th>
            </tr>
            </thead>
            <tbody>
            {educationalProgramsData?.data?.map((item) => (
                <tr key={item.id}>
                    <td>{item?.attributes?.title}</td>
                    <td>{item?.attributes?.field_form_educations}</td>
                    <td><TitleTaxonomy id={item?.relationships?.field_educational_level?.data?.id} /></td>
                    <td><TitleNode id={item?.relationships?.field_faculty?.data?.meta?.drupal_internal__target_id} /></td>
                </tr>
            ))}
            </tbody>
        </table>

    </>
}

export default CatalogEducationalPrograms