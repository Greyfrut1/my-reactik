import useDrupalData from "../services/api.jsx";
import ImageComponent from "./ImageComponent.jsx";
import React,{useState} from "react";

function Menu() {
    const { data: items } = useDrupalData(`/entity/menu/main-header-menu/tree`);
    const [showLogoBlock, setShowLogoBlock] = useState(true);
    const {
        data: headerLogoBlockData,
        isLoading: isHeaderLogoBlockLoading,
        error: headerLogoBlockError
    } = useDrupalData('jsonapi/block_content/about_the_university/f97b1379-de32-4696-bd50-7aac5d5ba992');
    const handleMouseEnter = () => {
        setShowLogoBlock(false);
    };

    const handleMouseLeave = () => {
        setShowLogoBlock(true);
    };

    return (
        <>
        <nav className={"main-menu"}>
            {items?.map((item) => (
                <ul className={"element-menu"} key={item?.link?.meta_data?.entity_id} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <li className={"level-one"}>
                        {item?.link?.url ? (
                            item?.link?.options ?
                                <a target={item?.link?.options?.attributes?.target} className={"level-one-link"} href={item?.link?.url}>{item?.link?.title}</a>
                                :
                                <a className={"level-one-link"} href={item?.link?.url}>{item?.link?.title}</a>
                            ) : (
                            <span className={"level-one-link"}>{item?.link?.title}</span>
                    )}
                        {item?.has_children && (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="w-6 h-6 main-menu__chevron">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                            </svg>
                        )}
                    </li>
                    {item?.has_children && (
                        <div className={"second-level"}>
                            {item?.subtree?.map((item2) => (
                                <ul className={"second-level-item"} key={item2?.link?.meta_data?.entity_id}>
                                    {item2?.link?.url ? (
                                        item2?.link?.options ?
                                            <li><a target={item2?.link?.options?.attributes?.target} className={"second-level-link"}
                                               href={item2?.link?.url}>{item2?.link?.title}</a>
                                                {item2?.has_children && (
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                                         stroke="currentColor" className="w-6 h-6 main-menu__chevron">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                                                    </svg>
                                                )}
                                            </li>
                                            :
                                            <li><a className={"second-level-link"}
                                               href={item2?.link?.url}>{item2?.link?.title}</a>
                                                {item2?.has_children && (
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                                         stroke="currentColor" className="w-6 h-6 main-menu__chevron">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                                                    </svg>
                                                )}
                                            </li>

                                    ) : (
                                        <li><span className={"second-level-link"}>{item2?.link?.title}</span>
                                            {item2?.has_children && (
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                                     stroke="currentColor" className="w-6 h-6 main-menu__chevron">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                                                </svg>
                                            )}</li>
                                    )}
                                    {item2?.has_children && (
                                        <ul className={"third-level"}>
                                            {item2?.subtree?.map((item3) => (
                                                <li className={"third-level-item"} key={item3?.link?.meta_data?.entity_id}>
                                                    {item3?.link?.url ? (
                                                        item3?.link?.options ?
                                                            <a target={item3?.link?.options?.attributes?.target} className={"third-level-link"}
                                                               href={item3?.link?.url}>{item3?.link?.title}</a>
                                                            :
                                                            <a className={"third-level-link"}
                                                               href={item3?.link?.url}>{item3?.link?.title}</a>

                                                    ) : (
                                                        <span className={"third-level-link"}>{item3?.link?.title}</span>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </ul>
                            ))}
                        </div>
                    )}
                </ul>
            ))}
        </nav>
            {showLogoBlock && (
                <div className={'main-menu__logo-block'}>

                    <div>{headerLogoBlockData?.data?.relationships?.field_image?.data?.meta?.drupal_internal__target_id &&
                        <ImageComponent
                            url={headerLogoBlockData?.data?.relationships?.field_image?.data?.meta?.drupal_internal__target_id}
                            alt={headerLogoBlockData?.data?.relationships?.field_image?.data?.meta?.alt}/>}</div>
                    <div
                        className={'main-menu__logo-text'}>{headerLogoBlockData?.data?.attributes?.field_main_text}</div>

                </div>
            )}
        </>
    );
}

export default Menu;
