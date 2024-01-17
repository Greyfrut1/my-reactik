import {useDepartmentViewQuery} from "../services/api.js";
import StaffTitlePosition from "../blocks/Staff/StaffTitlePosition.jsx";
import useLanguagePrefix from "../services/languagePrefix.jsx";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

export default function Departments({id_departments}){
    // Input head of department
    const languagePrefix = useLanguagePrefix();
    const { data:  department } =  useDepartmentViewQuery({ id_departments: `${id_departments}`});
    return (
        <div>
            {department?.data?.map((item, index) =>(
                <div key={index}>
                    <a href={`/${languagePrefix}${item?.path?.alias}`}>{item?.title}</a>
                    <img src={item?.field_image?.image_style_uri?.['thumbnail']}
                         alt={item?.field_image?.meta?.alt}/>
                    {item?.field_head_of_department &&(
                        <StaffTitlePosition staff_id={item?.field_head_of_department?.data?.meta?.drupal_internal__target_id} />
                    )}
                    {item?.field_mail?.map((mail, index) => (
                        <div key={index}>
                            <a href={`mailto:${mail}`}>{mail}</a>
                        </div>
                    ))}
                    {item?.field_phone?.map((phone, index) => (
                        <div key={index}>
                            <a href={`tel:${phone}`}>{phone}</a>
                        </div>
                    ))}
                    <div>
                        {item?.field_location}
                    </div>
                    <div>
                        {item?.field_wiki?.full_url}
                    </div>
                </div>
            ))}
        </div>
    );
}
Departments.propTypes = {
    id_departments: PropTypes.number.isRequired,
};