import {useState} from "react";
// import LanguageSwitcher from "../Header/LanguageSwitcher.jsx";
import useLanguagePrefix from "../../services/languagePrefix.jsx";
import TopHeaderMenu from "./Menu/TopHeaderMenu.jsx";
import './TopHeader.scss';
function TopHeader() {
    const languagePrefix = useLanguagePrefix();
    const [input, setInput] = useState("");
    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/${languagePrefix}/search/${input}`);
        setInput("")
    };
    return (
        <div className="top-header">
            <div className="container">
                <TopHeaderMenu/>
                {/*<LanguageSwitcher/>*/}
                <form onSubmit={handleSubmit}>
                    <input type="text" value={input} onChange={handleInputChange}/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default TopHeader;