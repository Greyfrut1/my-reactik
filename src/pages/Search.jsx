import {useNavigate, useParams} from "react-router-dom";
import {useSearchQuery} from "../services/api.js";
import {useEffect, useState} from "react";
import useLanguagePrefix from "../services/languagePrefix.jsx";

export default function Search() {
    const {result} = useParams();
    const navigate = useNavigate();
    const [inputValue2, setInputValue2] = useState(result);

    useEffect(() => {
        setInputValue2(result);
    }, [result]);

    const {data: search} = useSearchQuery({ result: `${result}`});

    const langPrefix = useLanguagePrefix();
    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/${langPrefix}/search/${inputValue2}`);
    };

    const handleInputChange = (event) => {
        setInputValue2(event.target.value);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input className="enter" type="text" value={inputValue2} onChange={handleInputChange} />
                <button type="submit">Submit</button>
            </form>
            <div>
                <h1>Results:</h1>
                {search?.rows?.map((item, index) => (
                    <div key={index}>
                        <div dangerouslySetInnerHTML={{__html: item?.title}}/>
                        <div dangerouslySetInnerHTML={{__html: item?.search_api_excerpt}}/>
                    </div>
                ))}
            </div>
        </>
    );
}