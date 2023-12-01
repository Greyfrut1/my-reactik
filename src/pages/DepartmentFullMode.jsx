import {useParams} from "react-router-dom";
import useDrupalData from "../services/api.jsx";

function DepartmentFullMode(){
    const { alias } = useParams();
    const {data: department} = useDrupalData(`department/${alias}?_format=json`)
    console.log(department)
    return(
        <>
            {department?.title?.[0]?.value}
        </>
    );
}
export default DepartmentFullMode