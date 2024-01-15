import useDrupalData from "../services/api.jsx";
import ImageComponent from "./ImageComponent.jsx";
import React, {useState, useEffect} from "react";

function Menu() {
    const {data: items} = useDrupalData(`/entity/menu/main-header-menu/tree`);
    const [showLogoBlock, setShowLogoBlock] = useState(true);
    const {
        data: headerLogoBlockData
    } = useDrupalData('jsonapi/block_content/about_the_university/f97b1379-de32-4696-bd50-7aac5d5ba992');
    const [activeElements, setActiveElements] = useState([]);
    const [scroll, setScroll] = useState('Bottom')
    const [isParentMenuHovered, setParentMenuHovered] = useState(null);
    const [isParentSecondHovered, setParentSecondHovered] = useState(null);
    const [isOverflowed, setIsOverflowed] = useState(false);
    const checkOverflow = () => {
        const mainMenuElement = document.getElementById('main-menu');
        const secondLevelElement = document.querySelector('.second-level');
        const thirdLevelElement = document.querySelector('.third-level');
        const isMainMenuOverflowed = mainMenuElement.scrollHeight > mainMenuElement.clientHeight;
        const isSecondLevelOverflowed = secondLevelElement ? secondLevelElement.scrollHeight > secondLevelElement.clientHeight : false;
        const isThirdLevelOverflowed = thirdLevelElement ? thirdLevelElement.scrollHeight > thirdLevelElement.clientHeight : false;
        setIsOverflowed(isMainMenuOverflowed || isSecondLevelOverflowed || isThirdLevelOverflowed);
    };
    const handleMouseEnter = (item) => {
        const mainMenuElement = document.getElementById('main-menu');
        setShowLogoBlock(false);
        setParentMenuHovered(item);
        setParentSecondHovered(null)
        setTimeout(() => {
            checkOverflow()
            if (mainMenuElement.scrollTop + mainMenuElement.clientHeight >= mainMenuElement.scrollHeight - 5) {
                setScroll('Top')
            } else {
                setScroll('Bottom')
            }
        }, 100);
    };
    const handleMouseEnterSecondLevel = (item) => {
        const mainMenuElement = document.getElementById('main-menu');
        setParentSecondHovered(item)

        setTimeout(() => {
            if (mainMenuElement.scrollTop + mainMenuElement.clientHeight >= mainMenuElement.scrollHeight - 5) {
                setScroll('Top')
            } else {
                setScroll('Bottom')
            }
            checkOverflow()
        }, 100);
    }

    const handleMouseLeave = () => {
        setShowLogoBlock(true);
        setParentMenuHovered(null)
        setParentSecondHovered(null)
        setTimeout(() => {
            checkOverflow()
        }, 100);
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
    const goToBottom = () => {
        const menu = document.querySelector('.main-menu');
        if (scroll == 'Bottom') {
            menu.scrollTo(0, menu.scrollHeight);
        } else if (scroll == 'Top') {
            menu.scrollTo(0, 0);
        }
    };

    useEffect(() => {
        const mainMenuElement = document.getElementById('main-menu');
        const secondLevelElement = document.querySelector('.second-level');

        const isMainMenuOverflowed = mainMenuElement.scrollHeight > mainMenuElement.clientHeight;
        const isSecondLevelOverflowed = secondLevelElement ? secondLevelElement.scrollHeight > secondLevelElement.clientHeight : false;
        setIsOverflowed(isMainMenuOverflowed || isSecondLevelOverflowed);
        const handleScroll = () => {
            const isMainMenuOverflowed = mainMenuElement.scrollHeight > mainMenuElement.clientHeight;
            const isSecondLevelOverflowed = secondLevelElement ? secondLevelElement.scrollHeight > secondLevelElement.clientHeight : false;
            setTimeout(() => {
                if (mainMenuElement.scrollTop + mainMenuElement.clientHeight >= mainMenuElement.scrollHeight - 5) {
                    setScroll('Top')
                } else {
                    setScroll('Bottom')
                }
            }, 50);

            setIsOverflowed(isMainMenuOverflowed || isSecondLevelOverflowed);
        };
        window.addEventListener('resize', handleScroll);
        mainMenuElement.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('resize', handleScroll);
            mainMenuElement.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <div className={'main-menu-block'} onMouseLeave={handleMouseLeave}>
                <nav id={'main-menu'} className={"main-menu"}>
                    {items?.map((item) => (
                        <ul className={`element-menu ${
                            activeElements.includes(item) ? "active" : ""
                        }`} key={item?.link?.meta_data?.entity_id} onMouseEnter={() => handleMouseEnter(item)}>
                            <li className={"level-one"}>
                                {item?.link?.url ? (
                                    item?.link?.options ?
                                        <a target={item?.link?.options?.attributes?.target} className={"level-one-link"}
                                           href={item?.link?.url}>{item?.link?.title}</a>
                                        :
                                        <a className={"level-one-link"} href={item?.link?.url}>{item?.link?.title}</a>
                                ) : (
                                    <span className={"level-one-link"}>{item?.link?.title}</span>
                                )}
                                {item?.has_children && (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5}
                                         stroke="currentColor" className="w-6 h-6 main-menu__chevron"
                                         onClick={() => handleClick(item)}>
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                                    </svg>
                                )}
                            </li>
                            {(item?.has_children) && (
                                <div id={'second-level'} className={"second-level"}
                                     style={{display: (item == isParentMenuHovered) ? 'block' : 'none'}}>
                                    {item?.subtree?.map((item2) => (
                                        <ul className={`second-level-item ${
                                            activeElements.includes(item2) ? "active" : ""
                                        }`} key={item2?.link?.meta_data?.entity_id}
                                            onMouseEnter={() => handleMouseEnterSecondLevel(item2)}>
                                            {item2?.link?.url ? (
                                                item2?.link?.options ?
                                                    <li><a target={item2?.link?.options?.attributes?.target}
                                                           className={"second-level-link"}
                                                           href={item2?.link?.url}>{item2?.link?.title}</a>
                                                        {item2?.has_children && (
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                 viewBox="0 0 24 24" strokeWidth={1.5}
                                                                 stroke="currentColor"
                                                                 className="w-6 h-6 main-menu__chevron"
                                                                 onClick={() => handleClick(item2)}>
                                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                                      d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                                                            </svg>
                                                        )}
                                                    </li>
                                                    :
                                                    <li><a className={"second-level-link"}
                                                           href={item2?.link?.url}>{item2?.link?.title}</a>
                                                        {item2?.has_children && (
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                 viewBox="0 0 24 24" strokeWidth={1.5}
                                                                 stroke="currentColor"
                                                                 className="w-6 h-6 main-menu__chevron"
                                                                 onClick={() => handleClick(item2)}>
                                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                                      d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                                                            </svg>
                                                        )}
                                                    </li>
                                            ) : (
                                                <li><span className={"second-level-link"}>{item2?.link?.title}</span>
                                                    {item2?.has_children && (
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                             viewBox="0 0 24 24" strokeWidth={1.5}
                                                             stroke="currentColor"
                                                             className="w-6 h-6 main-menu__chevron"
                                                             onClick={() => handleClick(item2)}>
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                                                        </svg>
                                                    )}</li>
                                            )}
                                            {item2?.has_children && (
                                                <ul className={`third-level`}
                                                    style={{display: (item2 == isParentSecondHovered) ? 'block' : 'none'}}>
                                                    {item2?.subtree?.map((item3) => (
                                                        <li className={"third-level-item"}
                                                            key={item3?.link?.meta_data?.entity_id}>
                                                            {item3?.link?.url ? (
                                                                item3?.link?.options ?
                                                                    <a target={item3?.link?.options?.attributes?.target}
                                                                       className={"third-level-link"}
                                                                       href={item3?.link?.url}>{item3?.link?.title}</a>
                                                                    :
                                                                    <a className={"third-level-link"}
                                                                       href={item3?.link?.url}>{item3?.link?.title}</a>
                                                            ) : (
                                                                <span
                                                                    className={"third-level-link"}>{item3?.link?.title}</span>
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
                {isOverflowed && <div
                    className={'scroll-block'}
                    onClick={goToBottom}
                    style={{cursor: 'pointer'}}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-6 h-6"
                         style={{transform: (scroll == 'Top') ? 'rotateZ(-180deg)' : 'none'}}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"/>
                    </svg>
                </div>}
                <div style={{display: (showLogoBlock) ? 'block' : 'none'}} className={'main-menu__logo-block'}>

                    <div>{headerLogoBlockData?.data?.relationships?.field_image?.data?.meta?.drupal_internal__target_id &&
                        <ImageComponent
                            url={headerLogoBlockData?.data?.relationships?.field_image?.data?.meta?.drupal_internal__target_id}
                            alt={headerLogoBlockData?.data?.relationships?.field_image?.data?.meta?.alt}/>}</div>
                    <div
                        className={'main-menu__logo-text'}>
                        <span>{headerLogoBlockData?.data?.attributes?.field_main_text}</span>{headerLogoBlockData?.data?.attributes?.field_second_text && <>
                        <br/><span
                        className={'main-menu__logo-second-text'}>{headerLogoBlockData?.data?.attributes?.field_second_text}</span></>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Menu;
