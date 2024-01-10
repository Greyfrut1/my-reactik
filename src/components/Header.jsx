import React, {useState} from 'react';
import useDrupalData from "../services/api.jsx";
import ImageComponent from "./ImageComponent.jsx";
import useLanguagePrefix from "../services/languagePrefix.jsx";
import LanguageSwitcher from "./LanguageSwitcher.jsx";
import Menu from "./Menu.jsx";
import TopHeaderMenu from "./TopHeaderMenu.jsx";
import {useNavigate, useLocation} from "react-router-dom";

// Замініть на шлях до вашого CSS файлу

function Header() {
    const location = useLocation();
    const {
        data: headerLogoBlockData,
        isLoading: isHeaderLogoBlockLoading,
        error: headerLogoBlockError
    } = useDrupalData('jsonapi/block_content/about_the_university/f97b1379-de32-4696-bd50-7aac5d5ba992');
    const [showMenuDialog, setShowMenuDialog] = useState(false);
    const [input, setInput] = useState("");
    const langPrefix = useLanguagePrefix();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/${langPrefix}/search/${input}`);
        setInput("");
    };

    const toggleMenuDialog = () => {
        setShowMenuDialog(!showMenuDialog);
        if (showMenuDialog) {
            document.body.style.overflow = 'unset';
        } else {
            document.body.style.overflow = 'hidden';
        }
    };
    const isSubpath = location.pathname === '/uk' || location.pathname === '/en';

    return (
        <>
            <div className={'header-block'}>
                <header className={`header ${isSubpath ? 'is-homepage' : ''}`}>
                    <div className={`header__burger-bar ${showMenuDialog ? 'show' : ''}`} onClick={toggleMenuDialog}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className={'header__logo-block'}>
                        <a href={`/${langPrefix}`}>
                            <div
                                className={'main-menu__logo-img-block'}>{headerLogoBlockData?.data?.relationships?.field_image?.data?.meta?.drupal_internal__target_id &&
                                <ImageComponent
                                    url={headerLogoBlockData?.data?.relationships?.field_image?.data?.meta?.drupal_internal__target_id}
                                    alt={headerLogoBlockData?.data?.relationships?.field_image?.data?.meta?.alt}/>}</div>
                            <div
                                className={'header__logo-text'}>
                                <span>{headerLogoBlockData?.data?.attributes?.field_main_text}</span><br/><span
                                className={'header__logo-second-text'}>{headerLogoBlockData?.data?.attributes?.field_second_text}</span>
                            </div>
                        </a>
                    </div>
                    <div className={'header__right-block'}>
                        <LanguageSwitcher/>
                        <form onSubmit={handleSubmit}>
                            <input className={'search-input'} type="text" value={input} onChange={handleInputChange}/>
                            <button type="submit">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28"
                                     viewBox="0 0 50 50" fill="currentColor">
                                    <path
                                        d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
                                </svg>
                            </button>
                        </form>
                    </div>
                </header>
            </div>
            <div className={`menu-dialog ${showMenuDialog ? 'show' : ''}`}>
                <div className={`menu-cross ${showMenuDialog ? 'show' : ''}`} onClick={toggleMenuDialog}>
                    <div></div>
                    <div></div>
                </div>
                <div className="menu_container">
                    <Menu/>
                </div>
                <TopHeaderMenu/>
            </div>
        </>
    );
}

export default Header;
