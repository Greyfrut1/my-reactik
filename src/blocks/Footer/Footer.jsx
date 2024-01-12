import { useState, useEffect } from 'react';
import FooterInfoBlock from "./FooterInfoBlock/FooterInfoBlock.jsx";
import FooterMenu from "./FooterMenu/FooterMenu.jsx";
// import Paragraph from "../../components/Common/Paragraph.jsx";
import useLanguagePrefix from "../../services/languagePrefix.jsx";
import axios from "axios";
import {useFooterDevelopmentByBlockQuery} from "../../services/api.js";
import './Footer.scss';
import PartnersSlider from "../../sliders/PartnersSlider/PartnersSlider.jsx";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const Footer = () => {

    // State for storing the current date and time
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [activeUsersData, setActiveUsersData] = useState(null);

    const { data:  developmentByBlockData } = useFooterDevelopmentByBlockQuery();

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


    return (
        <div className="footer">
            <div>{(langPrefix === 'en' && "Date: ") || "Дата: "}{formattedDate} {(langPrefix === 'en' && "Time: ")|| "Час: "}{formattedTime} {(activeUsersData?.active_users != "0" && <div>Online: {activeUsersData?.active_users}</div>)}</div>
            <FooterInfoBlock/>
            <FooterMenu/>
            <div>
                <div>Development</div>
                <div><a href={developmentByBlockData?.data?.attributes?.field_link_to?.uri}>{developmentByBlockData?.data?.attributes?.field_link_to?.title}</a></div>
            </div>
        </div>
    );
};

export default Footer;
