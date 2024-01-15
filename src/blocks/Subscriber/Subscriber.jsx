import axios from "axios";
import {useState} from "react";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNewsLetterSubscriberQuery} from "../../services/api.js";
import useLanguagePrefix from "../../services/languagePrefix.jsx";
import SocialLinks from "../../components/SocialLinks.jsx";
const baseURL = import.meta.env.VITE_BACKEND_URL;
import './Subscriber.scss';

export default function Subscriber() {
    const [email, setEmail] = useState('');

    const {data: newsletterBlock} = useNewsLetterSubscriberQuery();
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
            <form onSubmit={handleSubmit}>
                <button
                    type="submit">{(langPrefix === "en" && "Subscribe") || (langPrefix === "uk" && "Підписатися")}</button>
            </form>
        </div>
    );
}