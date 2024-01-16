import {useFacultiesViewQuery} from "../../services/api.js";
import useLanguagePrefix from "../../services/languagePrefix.jsx";
import ContactInformation from "../../components/Common/ContactInformation.jsx";
import MetaTags from "../../components/Common/MetaTags.jsx";
import {Link, useLocation} from "react-router-dom";
import './FacultyView.scss';


export default function FacultyView() {
    const languagePrefix = useLanguagePrefix()
    const {data: facultyData} = useFacultiesViewQuery();
    const location = useLocation();
    const currentPath = location.pathname;
    return (
        <>
            <MetaTags type={"view"} data={facultyData} viewUrl={currentPath}/>
            <div className={"faculty-view container"}>
                {facultyData?.data?.map((item, index) => (
                    <div className={"faculty-view_item"} key={index}>
                        <Link to={`/${languagePrefix}${item?.path?.alias}`}>
                            <img src={item?.field_image?.image_style_uri?.['thumbnail']}
                                 alt={item?.field_image?.meta?.alt}/>
                        </Link>
                        <div>
                            <Link to={`/${languagePrefix}${item?.path?.alias}`}>{item?.title}</Link>
                            <ContactInformation data={item} type={"views"}/>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}