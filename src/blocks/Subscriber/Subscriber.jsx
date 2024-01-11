import axios from "axios";
import {useState} from "react";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNewsLetterSubscriber} from "../../services/api.js";
import useLanguagePrefix from "../../services/languagePrefix.jsx";
import SocialLinks from "../../components/SocialLinks.jsx";
const baseURL = import.meta.env.VITE_BACKEND_URL;
import './Subscriber.scss';

export default function Subscriber() {
    const [email, setEmail] = useState('');
    const {data: newsletterBlock} = useNewsLetterSubscriber();
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
            <div className="subscriber-from">
                {newsletterBlock?.info && (
                    <div className={"subscriber-from__text"}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                            <path
                                d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"/>
                            <path
                                d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"/>
                        </svg>
                        <p>{newsletterBlock?.info?.[0]?.value}</p>
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <input required={"required"} type={"email"} value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           placeholder={(langPrefix === "en" && "Enter your email") || (langPrefix === "uk" && "Введіть електронну пошту") || "Placeholder"}/>
                    <button
                        type="submit">{(langPrefix === "en" && "Subscribe") || (langPrefix === "uk" && "Підписатися")}</button>
                </form>
            </div>
            <SocialLinks/>
        </div>
    );
}