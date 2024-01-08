import React,{useState} from "react";
import {useHeaderMenuQuery, useHeaderLogoQuery} from "../../services/api.js";
import './HeaderMenu.scss';
import {NavLink} from "react-router-dom";
function HeaderMenu() {
    const { data: items } = useHeaderMenuQuery();
    const [showLogoBlock, setShowLogoBlock] = useState(true);
    const { data: headerLogoBlockData } =  useHeaderLogoQuery();

    const [activeElement, setActiveElement] = useState(null);
    const [activeElements, setActiveElements] = useState([]);
    const handleMouseEnter = () => {
        setShowLogoBlock(false);
    };

    const handleMouseLeave = () => {
        setShowLogoBlock(true);
    };

    const handleClick = (item) => {
        setActiveElements((prevActiveElements) => {
            if (prevActiveElements.includes(item)) {
                return prevActiveElements.filter((el) => el !== item);
            } else {
                return [...prevActiveElements, item];
            }
        });
    };

    return (
        <>
            <nav className={"main-menu"}>
                {items?.map((item) => (
                    <ul className={`element-menu ${
                        activeElements.includes(item) ? "active" : ""
                    }`} key={item?.link?.meta_data?.entity_id} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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
                                     stroke="currentColor" className="w-6 h-6 main-menu__chevron" onClick={() => handleClick(item)}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                                </svg>
                            )}
                        </li>
                        {item?.has_children && (
                            <div className={"second-level"}>
                                {item?.subtree?.map((item2) => (
                                    <ul className={`second-level-item ${
                                        activeElements.includes(item2) ? "active" : ""
                                    }`} key={item2?.link?.meta_data?.entity_id}>
                                        {item2?.link?.url ? (
                                            item2?.link?.options ?
                                                <li><a target={item2?.link?.options?.attributes?.target} className={"second-level-link"}
                                                       href={item2?.link?.url}>{item2?.link?.title}</a>
                                                    {item2?.has_children && (
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                                             stroke="currentColor" className="w-6 h-6 main-menu__chevron" onClick={() => handleClick(item2)}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                                                        </svg>
                                                    )}
                                                </li>
                                                :
                                                <li><a className={"second-level-link"}
                                                       href={item2?.link?.url}>{item2?.link?.title}</a>
                                                    {item2?.has_children && (
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                                             stroke="currentColor" className="w-6 h-6 main-menu__chevron" onClick={() => handleClick(item2)}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                                                        </svg>
                                                    )}
                                                </li>

                                        ) : (
                                            <li><span className={"second-level-link"}>{item2?.link?.title}</span>
                                                {item2?.has_children && (
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                                         stroke="currentColor" className="w-6 h-6 main-menu__chevron" onClick={() => handleClick(item2)}>
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
                    <img src={headerLogoBlockData?.included?.[0]?.attributes.image_style_uri?.['thumbnail']} alt="alt"/>
                    <div
                        className={'main-menu__logo-text'}>{headerLogoBlockData?.data?.attributes?.field_main_text}</div>

                </div>
            )}
        </>
    );
}

export default HeaderMenu;
