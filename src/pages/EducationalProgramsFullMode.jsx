import {useParams} from "react-router-dom";
import useDrupalData from "../services/api.jsx";
import EntityTitle from "../components/EntityTitle.jsx";
import ElectiveDisciplines from "../components/ElectiveDisciplines.jsx";
import MainDusciplines from "../components/MainDusciplines.jsx";

function EducationalProgramsFullMode() {
    const {alias} = useParams();
    const {data: educationalProgramData} = useDrupalData(`/educational-programs/${alias}?_format=json`);

    return <>
        <div><h2>{educationalProgramData?.title?.[0]?.value}</h2>
            <div>
                <div>Main disciplines</div>
                <table>
                    <tbody>
                    <MainDusciplines endpoint={`${educationalProgramData?.nid?.[0].value}`}/>
                    </tbody>
                </table>

            </div>
            <div dangerouslySetInnerHTML={{__html: `${educationalProgramData?.field_description_program?.[0].value}`}}>

            </div>
            <div>
                <div>Actual elective disciplines</div>
                <ElectiveDisciplines endpoint={`/actual-disciplines/${educationalProgramData?.nid?.[0].value}`}/>
            </div>
            <div>
                <div>Archive of elective courses</div>
                <ElectiveDisciplines endpoint={`/old-disciplines/${educationalProgramData?.nid?.[0].value}`}/>
            </div>
        </div>
        <div>
            <div>
                <div>Validity</div>
                <div>{educationalProgramData?.field_validity?.[0]?.value}</div>
            </div>
            <div>
                <div>Form education</div>
                <div>{educationalProgramData?.field_form_educations?.[0]?.value}</div>
            </div>
            <div>
                <div>Level</div>
                {educationalProgramData?.field_educational_level?.[0]?.target_uuid && <div><EntityTitle
                    endpoint={`/taxonomy_term/educational_level/${educationalProgramData?.field_educational_level?.[0]?.target_uuid}`}/>
                </div>}
            </div>
            <div>
                <div>Field of knowledge</div>
                <div>{educationalProgramData?.field_field_of_knowledge?.[0].value}</div>
            </div>
            <div>
                <div>Special qualification level</div>
                <div>{educationalProgramData?.field_special_qualification_lvl?.[0].value}</div>
            </div>
            <div>
                <div>Employment opportunities</div>
                <div>{educationalProgramData?.field_employment_opportunities?.[0].value}</div>
            </div>
            <div>
                <div>Uniqueness and specificity</div>
                <div>{educationalProgramData?.field_uniqueness_and_specificity?.[0].value}</div>
            </div>
            <div>
                <div>Number of credits</div>
                <div>{educationalProgramData?.field_number_of_credits?.[0]?.value}</div>
            </div>
            <div>
                <div>Faculty</div>
                {educationalProgramData?.field_faculty?.[0]?.target_uuid && <EntityTitle
                    endpoint={`/node/faculty/${educationalProgramData?.field_faculty?.[0]?.target_uuid}`}/>}
            </div>
            <div>
                <div>Guarantor</div>
                {educationalProgramData?.field_guarantor?.[0]?.target_uuid && <EntityTitle
                    endpoint={`/node/staff/${educationalProgramData?.field_guarantor?.[0]?.target_uuid}`}/>}

            </div>
            <div>
                <div>Qualifications</div>
                <div><b>Educational
                    qualifications:</b>{educationalProgramData?.field_educational_qualifications?.[0].value}</div>
                <div><b>Professional
                    qualifications:</b>{educationalProgramData?.field_professional_qualification?.[0].value}</div>
            </div>
            <div>
                <div>Specialty</div>
                <div>{educationalProgramData?.field_specialty?.[0]?.target_uuid && <EntityTitle
                    endpoint={`/taxonomy_term/specialty/${educationalProgramData?.field_specialty?.[0]?.target_uuid}`}/>}</div>
            </div>
        </div>
    </>
}

export default EducationalProgramsFullMode