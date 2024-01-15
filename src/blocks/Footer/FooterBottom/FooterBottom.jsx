import { useState, useEffect } from 'react';
import axios from "axios";
import useLanguagePrefix from "../../../services/languagePrefix.jsx";
const baseURL = import.meta.env.VITE_BACKEND_URL;
import './FooterBottom.scss';
import SocialLinks from "../../../components/SocialLinks.jsx";
import {useLocation} from "react-router-dom";
import Subscriber from "../../Subscriber/Subscriber.jsx";


const FooterBottom = () => {

    // State for storing the current date and time.
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [activeUsersData, setActiveUsersData] = useState(null);

    const fetchActiveUsersData = async () => {
        try {
            const response = await axios.get(`${baseURL}/google-analytics-data`);
            setActiveUsersData(response.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const langPrefix = useLanguagePrefix();

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const formattedDate = currentDateTime.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    const formattedTime = currentDateTime.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    useEffect(() => {
        fetchActiveUsersData();
        const intervalId = setInterval(() => {
            fetchActiveUsersData();
        }, 10000);

        return () => clearInterval(intervalId);
    },[]);

    const location = useLocation();
    const isUnsubscribePage = location.pathname.startsWith("/simplenews/remove/");

    return (
        <div className="footer-bottom">
            <div className="footer-bottom__block container">
                {!isUnsubscribePage && (
                    <Subscriber/>
                )}
                <SocialLinks/>
                <div
                    className="footer-bottom__block-time">{(langPrefix === 'en' && "Date: ") || "Дата: "}{formattedDate} {(langPrefix === 'en' && "Time: ") || "Час: "}{formattedTime} {(activeUsersData?.active_users != "0" &&
                    <>Online: {activeUsersData?.active_users}</>)}</div>
            </div>
        </div>
    );
};

export default FooterBottom;
