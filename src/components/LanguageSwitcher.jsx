import useDrupalData from "../services/api.jsx";
import { useEffect, useState } from "react";
import axios from "axios";


const baseURL = import.meta.env.VITE_BACKEND_URL;
function LanguageSwitcher() {

    const currentLang = window.location.pathname.split('/')[1];
    const currentUrl = window.location.pathname;
    const urlParts = currentUrl.split('/');
    const alias = window.location.pathname.split('/')[3];
    const slicedUrl = urlParts.slice(2).join('/');
    const { data: data } = useDrupalData(`${slicedUrl}?_format=json`);
    var switchLang
    if (currentLang === 'uk') {
        switchLang = 'en';
    } else if (currentLang === 'en') {
        switchLang = 'uk';
    }

    const [data2, setData2] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData2 = async () => {
            try {
                    if(data && alias){
                        const response = await axios.get(`${baseURL}/${switchLang}/node/${data?.nid?.[0].value}?_format=json`);

                        // Оновлюємо стан з отриманими даними
                        setData2(response.data);
                        setLoading(false);
                    }


            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData2();
    }, [data])

    return (
        <div>
            {alias &&<div>
                {data2?.path?.[0].alias &&  <a href={`/${switchLang}${data2?.path?.[0].alias}`}>Switch language</a>}
            </div>}
            {(!alias && slicedUrl) && <div>
                <a href={`/${switchLang}/${slicedUrl}`}>Switch language</a>
            </div>}
            {(!alias && !slicedUrl) && <div>
                <a href={`/${switchLang}`}>Switch language</a>
            </div>}
        </div>
    );
}

export default LanguageSwitcher;
