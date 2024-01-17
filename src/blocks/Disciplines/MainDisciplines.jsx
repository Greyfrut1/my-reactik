import {useGeneralDataQuery,
    useProfessionalDataQuery,
    useCertificationDataQuery} from "../../services/api.js";
import PropTypes from "prop-types";
import {useContext, useEffect} from "react";
import {LoadingContext} from "../../context/loading-context.jsx";

const baseURL = import.meta.env.VITE_BACKEND_URL;

function MainDisciplines({endpoint}) {
    const {data: generalData, isFetching: generalFetch} = useGeneralDataQuery({endpoint: `${endpoint}`});
    const {data: certificationData, isFetching: professionalFetch} =  useProfessionalDataQuery({endpoint: `${endpoint}`});
    const {data: professionalData, isFetching: certificationFetch} =  useCertificationDataQuery({endpoint: `${endpoint}`});
    var row = 0;


    const {setLoadingValue} = useContext(LoadingContext)
    useEffect(() => {
        if(!generalFetch || !certificationFetch || !professionalFetch){setLoadingValue({ MainDisciplines: true });} else { setLoadingValue({ MainDisciplines: false } )}
    }, [generalFetch, certificationFetch, professionalFetch]);
    return <>
    {(Array.isArray(generalData?.rows) && generalData?.rows.length !== 0) && <tr>
        <td>General training cycle</td>
    </tr>}
    {generalData?.rows?.map((item, index) => {
        row++;
        return (
            <tr key={index}>
                <td>{row}</td>
                <td><a href={baseURL + item?.field_document_main_discipline} target={"_blank"}
                       rel={"noopener noreferrer"}>{item?.field_name_discipline}</a></td>
                <td>{item?.field_course_of_study}</td>
            </tr>)
    })}
    {(Array.isArray(professionalData?.rows) && professionalData?.rows.length !== 0) && <tr>
        <td>Professional training cycle</td>
    </tr>}
    {professionalData?.rows?.map((item, index) => {
        row++;
        return (
            <tr key={index}>
                <td>{row}</td>
                <td><a href={baseURL + item?.field_document_main_discipline} target={"_blank"}
                       rel={"noopener noreferrer"}>{item?.field_name_discipline}</a></td>
                <td>{item?.field_course_of_study}</td>
            </tr>)
    })}
    {(Array.isArray(certificationData?.rows) && certificationData?.rows.length !== 0) && <tr>
        <td>Certification</td>
    </tr>}
    {certificationData?.rows?.map((item, index) => {
        row++;
        return (
            <tr key={index}>
                <td>{row}</td>
                <td><a href={baseURL + item?.field_document_main_discipline} target={"_blank"}
                       rel={"noopener noreferrer"}>{item?.field_name_discipline}</a></td>
                <td>{item?.field_course_of_study}</td>
            </tr>)
    })}

    </>
}

MainDisciplines.propTypes = {
    endpoint: PropTypes.string.isRequired
};

export default MainDisciplines