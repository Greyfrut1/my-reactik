import {useNavigate, useParams} from "react-router-dom";
import useDrupalData from "../services/api.jsx";
import { useEffect, useState } from "react";
import axios from "axios";


const baseURL = import.meta.env.VITE_BACKEND_URL;
function LanguageSwitcher() {
    const currentLang = window.location.pathname.split('/')[1];
    const currentUrl = window.location.pathname;
    const urlParts = currentUrl.split('/');
    // const { alias } = useParams();
    const alias = window.location.pathname.split('/')[3];
    // Вибираємо частини URL, починаючи з другої (індекс 1)
    const slicedUrl = urlParts.slice(2).join('/');



    const { data: data } = useDrupalData(`${slicedUrl}?_format=json`);
    console.log('currentLang ' + currentLang)
    console.log('urlParts ' + slicedUrl)
    var switchLang
    if (currentLang === 'uk') {
        switchLang = 'en';
    } else if (currentLang === 'en') {
        switchLang = 'uk';
    }

    const [data2, setData2] = useState(null);
    const [loading, setLoading] = useState(true);
    console.log(`data: ${data}`)
    console.log(`${baseURL}/${switchLang}/node/${data?.nid?.[0].value}`)
    console.log(alias)
    useEffect(() => {
        // Функція для отримання даних
        const fetchData2 = async () => {
            try {
                // Перевірка, чи є `data` не `null` або `undefined`, інакше не робимо другий запит
                    if(data && alias){
                        const response = await axios.get(`${baseURL}/${switchLang}/node/${data?.nid?.[0].value}?_format=json`);

                        // Оновлюємо стан з отриманими даними
                        setData2(response.data);
                        setLoading(false);
                    }
                    // Замініть URL на свій JSON API URL


            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        // Викликаємо функцію отримання даних2 тільки якщо data визначено
        fetchData2();
    }, [data])


    console.log('data2: ' + data2);
    console.log('slicedUrl: ' +slicedUrl)
    return (
        <div>
            {/*<div>*/}
            {/*    <a href={`/en/${slicedUrl}`}>English</a>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <a href={`/uk/${slicedUrl}`}>Ukrainian</a>*/}
            {/*</div>*/}
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
