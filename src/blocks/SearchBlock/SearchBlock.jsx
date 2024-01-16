import {useState} from 'react';
import useLanguagePrefix from "../../services/languagePrefix.jsx";
import {useNavigate} from "react-router-dom";
import './SearchBlock.scss';

export default function SearchBlock() {
    const [input, setInput] = useState("");
    const langPrefix = useLanguagePrefix();
    const navigate = useNavigate();
    const [showSearch, setShowSearch] = useState(false);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/${langPrefix}/search/${input}`);
        setInput("");
        setShowSearch(false);
    };

    const handleSearch = () => {
        setShowSearch(!showSearch);
    };
    return (
        <>
            <svg onClick={handleSearch} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28"
                 height="28"
                 viewBox="0 0 50 50" fill="currentColor">
                <path
                    d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
            </svg>
            <div style={{display: (showSearch) ? 'block' : 'none'}} className={'search-form-block'}>
                <form className={'search-form'} onSubmit={handleSubmit}>
                    <input className={'search-input'} type="text" value={input} onChange={handleInputChange}/>
                    <button type="submit">
                        {(langPrefix === 'en' && 'Search') || "Пошук"}
                    </button>
                </form>
            </div>
        </>
    );
}