import useDrupalData from "../services/api.jsx";
import ImageComponent from "./ImageComponent.jsx";
import useLanguagePrefix from "../services/languagePrefix.jsx";
function Header(){
    const {
        data: headerLogoBlockData,
        isLoading: isHeaderLogoBlockLoading,
        error: headerLogoBlockError
    } = useDrupalData('jsonapi/block_content/about_the_university/f97b1379-de32-4696-bd50-7aac5d5ba992');

    const langPrefix = useLanguagePrefix();

    return <div className={'header__logo-block'}>
        <a href={`/${langPrefix}`}>
        <div>{headerLogoBlockData?.data?.relationships?.field_image?.data?.meta?.drupal_internal__target_id && <ImageComponent url={headerLogoBlockData?.data?.relationships?.field_image?.data?.meta?.drupal_internal__target_id} alt={headerLogoBlockData?.data?.relationships?.field_image?.data?.meta?.alt} />}</div>
        <div className={'header__logo-text'}>{headerLogoBlockData?.data?.attributes?.field_main_text}</div>
        </a>
    </div>
}

export default Header