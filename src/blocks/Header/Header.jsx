import { useState } from 'react';
import {useHeaderLogoQuery} from "../../services/api.js";
import useLanguagePrefix from "../../services/languagePrefix.jsx";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher.jsx";
import Menu from "../HeaderMenu/HeaderMenu.jsx";
import TopHeaderMenu from "../TopHeaderMenu/TopHeaderMenu.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import './Header.scss';

function Header() {
    const location = useLocation();
    const { data: headerLogoBlockData } = useHeaderLogoQuery();
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
    return (
        <>
            <header className='header'>
                <div className={`header__burger-bar ${showMenuDialog ? 'show' : ''}`} onClick={toggleMenuDialog}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className={'header__logo-block'}>
                    <a href={`/${langPrefix}`}>
                        <img src={headerLogoBlockData?.included?.[0]?.attributes?.image_style_uri?.['thumbnail']}
                             alt="alt"/>
                        <div
                            className={'header__logo-text'}>{headerLogoBlockData?.data?.attributes?.field_main_text}</div>
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