import {useContext, useEffect, useState} from 'react';
import {useHeaderLogoQuery} from "../../services/api.js";
import useLanguagePrefix from "../../services/languagePrefix.jsx";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher.jsx";
import Menu from "../HeaderMenu/HeaderMenu.jsx";
import TopHeaderMenu from "../TopHeaderMenu/TopHeaderMenu.jsx";
import './Header.scss';
import SearchBlock from "../SearchBlock/SearchBlock.jsx";
import {LoadingContext} from "../../context/loading-context.jsx";

function Header() {
    const { data: headerLogoBlockData, isFetching } = useHeaderLogoQuery();
    const [showMenuDialog, setShowMenuDialog] = useState(false);
    const langPrefix = useLanguagePrefix();
    const toggleMenuDialog = () => {
        setShowMenuDialog(!showMenuDialog);
        if (showMenuDialog) {
            document.body.style.overflow = 'unset';
        } else {
            document.body.style.overflow = 'hidden';
        }
    };
    const {setLoadingValue} = useContext(LoadingContext)
    // useEffect(() => {
    //     if(!isFetching){setLoadingValue({ Header: true });} else { setLoadingValue({ Header: false } )}
    // }, [isFetching]);
    return (
        <>
            <div className={'header-block'}>
                <header className={`header`}>
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
                                className={'header__logo-text'}>
                                <span>{headerLogoBlockData?.data?.attributes?.field_main_text}</span><br/><span
                                className={'header__logo-second-text'}>{headerLogoBlockData?.data?.attributes?.field_second_text}</span>
                            </div>
                        </a>
                    </div>
                    <div className={'header__right-block'}>
                        <LanguageSwitcher/>
                        <SearchBlock/>
                    </div>
                </header>
            </div>
            <div className={`menu-dialog ${showMenuDialog ? 'show' : ''}`}>
                <div className={'menu-dialog-header'}>
                    <div className={`menu-cross ${showMenuDialog ? 'show' : ''}`} onClick={toggleMenuDialog}>
                        <div></div>
                        <div></div>
                    </div>
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