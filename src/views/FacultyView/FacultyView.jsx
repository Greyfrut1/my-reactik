import {useFacultiesViewQuery} from "../../services/api.js";
import useLanguagePrefix from "../../services/languagePrefix.jsx";
import ContactInformation from "../../components/Common/ContactInformation.jsx";
import MetaTags from "../../components/Common/MetaTags.jsx";
import {Link, useLocation} from "react-router-dom";
import './FacultyView.scss';
import {useContext, useEffect} from "react";
import {LoadingContext} from "../../context/loading-context.jsx";


export default function FacultyView() {
    const languagePrefix = useLanguagePrefix()
    const {data: facultyData, isFetching} = useFacultiesViewQuery();
    const location = useLocation();
    const currentPath = location.pathname;
    const {setLoadingValue} = useContext(LoadingContext)
    useEffect(() => {
        if(!isFetching){setLoadingValue({ FacultyView: true });} else { setLoadingValue({ FacultyView: false } )}
    }, [isFetching]);
    return (
        <>
            <MetaTags type={"view"} data={facultyData} viewUrl={currentPath}/>
            <div className={"faculty-view container"}>
                {facultyData?.data?.map((item, index) => (
                    <div className={"faculty-view_item"} key={index}>
                        <a href={`/${languagePrefix}${item?.path?.alias}`}>
                            <img src={item?.field_image?.image_style_uri?.['thumbnail']}
                                 alt={item?.field_image?.meta?.alt}/>
                        </a>
                        <div>
                            <a href={`/${languagePrefix}${item?.path?.alias}`}>{item?.title}</a>
                            <ContactInformation data={item} type={"views"}/>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}