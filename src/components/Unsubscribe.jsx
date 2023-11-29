import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import useDrupalData from "../services/api.jsx";
import {toast} from "react-toastify";

const baseURL = import.meta.env.VITE_BACKEND_URL;

function Unsubscriber() {
    const navigate = useNavigate();
    const {iduser, idnewsletter, timestamp, hash} = useParams();
    const { data: subscriber, isLoading: subscriberLoading } = useDrupalData(`entity/simplenews_subscriber/${iduser}`);
    const { data: newsletter, isLoading: newsletterLoading } = useDrupalData(`entity/simplenews_newsletter/${idnewsletter}`);
    const email = subscriber?.mail?.[0].value;
    const maskedEmail = email
        ? email.replace(/(?<=.{1}).(?=[^@]*?.@)/g, "*")
        : "";

    if (subscriberLoading || newsletterLoading) {
        return null;
    }
    // Check if either subscriber or newsletter is undefined or null
    if (!subscriber || !newsletter) {
        // Redirect to home page
        navigate('/');
        return null;
    }

    // Check if either subscriber or newsletter is undefined or null
    if (subscriber.length < 1 || newsletter.length < 1) {
        // Redirect to home page
        navigate('/');
        return null;
    }
    const handleCancel = () => {
        navigate('/');
    };
    const handleSubmit = (event) => {

        event.preventDefault();

        axios.post(`${baseURL}simplenews/remove/${iduser}/${idnewsletter}/${timestamp}/${hash}/ok`)
            .then((response) => {
                console.log(response.data, response);
                toast.success("Success unsubscribe!");
                navigate('/');
            })
            .catch((error) => {
                console.error(error);
                toast.error("Failed to unsubscribe.");

            });
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <p>
                    This action will unsubscribe you from the newsletter mailing list.
                </p>
                <p>
                    Are you sure you want to remove
                    <em className="placeholder">{maskedEmail}</em> from the
                    <em className="placeholder">{newsletter?.name}</em> mailing list?
                </p>
                <div>
                    <button type="submit">Unsubscribe</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </>
    );
}

export default Unsubscriber