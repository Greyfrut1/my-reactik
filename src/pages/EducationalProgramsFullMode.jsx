import {useParams} from "react-router-dom";
import useDrupalData from "../services/api.jsx";

function EducationalProgramsFullMode() {
    const {alias} = useParams();

    const {data: educationalProgramData} = useDrupalData(`/educational-programs/${alias}?_format=json`)
    console.log(educationalProgramData)
    return <>
        <div><h2>{educationalProgramData?.title?.[0]?.value}</h2>
            <div>
                <table>
                    <tbody>
                    {educationalProgramData?.field_main_courses?.map((item) => (
                        <tr key={item.target_id}><td>{item.target_id}</td></tr>
                    ))}
                    </tbody>
                </table>
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
                <div>{educationalProgramData?.field_educational_level?.[0]?.target_id}</div>
            </div>
            <div>
                <div>Number of credits</div>
                <div>{educationalProgramData?.field_number_of_credits?.[0]?.value}</div>
            </div>
            <div>
                <div>Faculty</div>
                <div>{educationalProgramData?.field_faculty?.[0]?.target_id}</div>
            </div>
            <div>
                <div>Guarantor</div>
                <div>{educationalProgramData?.field_guarantor?.[0]?.target_id}</div>
            </div>
            <div>
                <div>Specialty</div>
                <div>{educationalProgramData?.field_specialty?.[0]?.target_id}</div>
            </div>
        </div>
    </>
}

export default EducationalProgramsFullMode