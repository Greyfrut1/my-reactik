import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNewsLetterSubscriberQuery} from "../../services/api.js";
import useLanguagePrefix from "../../services/languagePrefix.jsx";
const baseURL = import.meta.env.VITE_BACKEND_URL;
import './Subscriber.scss';

export default function Subscriber() {
    const [email, setEmail] = useState('');
    const {data} = useNewsLetterSubscriberQuery();
    const img = data?.data?.field_image?.image_style_uri?.['news_440x232'];

    const handleSubmit = (event) => {

        event.preventDefault();

        const submitFormData = {
            mail: [email],
            subscriptions: ["default"],
        };

        axios.post(`${baseURL}entity/simplenews_subscriber`, submitFormData)
            .then((response) => {
                console.log(response.data, response);
                toast.success("Success subscribe!");

            })
            .catch((error) => {
                console.error(error);
                toast.error("Failed to subscribe.");

            });
    }

    const langPrefix = useLanguagePrefix();

    return (
        <div className="subscriber">
            <h1 className="subscriber-title">
                {data?.data.info}
            </h1>
            <p
                className="subscriber-text"
                dangerouslySetInnerHTML={{
                    __html: data?.data.body?.processed,
                }}
            />
            <form onSubmit={handleSubmit} className={"flex w-1/2 relative items-center"}>
                <input required={"required"} type={"email"} value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       placeholder={(langPrefix === "en" && "Enter your e-mail") || (langPrefix === "uk" && "Введіть e-mail")}/>
                <button
                    type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                    </svg>
                </button>
            </form>
        </div>
    );
}