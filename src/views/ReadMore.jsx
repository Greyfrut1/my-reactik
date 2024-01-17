import useLanguagePrefix from "../services/languagePrefix.jsx";
export default function ReadMore(){
    const langPrefix = useLanguagePrefix()
    return <>
        {langPrefix === 'en' && <>Read more</>}
        {langPrefix === 'uk' && <>Детальніше</>}
    </>
}