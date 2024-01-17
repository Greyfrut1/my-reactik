import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNewsLetterSubscriberQuery} from "../../services/api.js";
import useLanguagePrefix from "../../services/languagePrefix.jsx";
import SocialLinks from "../../components/SocialLinks.jsx";
const baseURL = import.meta.env.VITE_BACKEND_URL;
import './Subscriber.scss';
import {LoadingContext} from "../../context/loading-context.jsx";

export default function Subscriber() {
    const [email, setEmail] = useState('');
    const {data: newsletterBlock, isFetching} = useNewsLetterSubscriberQuery();
    const {setLoadingValue} = useContext(LoadingContext)
    // useEffect(() => {
    //     if(!isFetching){setLoadingValue({ Subscriber: true });} else { setLoadingValue({ Subscriber: false } )}
    // }, [isFetching]);
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