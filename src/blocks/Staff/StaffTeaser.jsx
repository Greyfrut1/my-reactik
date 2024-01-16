import {useNodeQuery} from "../../services/api.js";
import ImageComponent from "../../components/Image/ImageComponent.jsx";
import PropTypes from "prop-types";

function StaffTeaser({staff_id}){

    const { data:  staffCard } =  useNodeQuery({ nid: `${staff_id}`});
    return(
        <>
            <div>{staffCard?.title?.[0]?.value}</div>
            {staffCard?.field_image?.length > 0 &&(
                <ImageComponent alt={staffCard?.field_image?.[0]?.alt} imagestyle={"thumbnail"} url={staffCard?.field_image?.[0]?.target_id}/>
            )}
            <div>{staffCard?.field_location?.[0].value}</div>
            {staffCard?.field_mail?.map((mail, index)=>(
                <div key={index}>
                    {mail.value}
                </div>
            ))}
            {staffCard?.field_phone?.map((phone, index)=>(
                <div key={index}>
                    {phone.value}
                </div>
            ))}
        </>
    );
}
StaffTeaser.propTypes = {
    staff_id: PropTypes.number.isRequired,
};
export default StaffTeaser;