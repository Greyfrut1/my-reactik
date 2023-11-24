import axios from "axios";
import {useState} from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const baseURL = import.meta.env.VITE_BACKEND_URL;

function Subscriber() {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [city, setCity] = useState('');
    const [showAdditionalFields, setShowAdditionalFields] = useState(false);

    const handleSubmit = (event) => {

        event.preventDefault();

        const submitFormData = {
            mail:[email],
            field_city:[city],
            field_first_name:[firstName],
            field_last_name:[lastName],
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
    const toggleAdditionalFields = () => {
        setShowAdditionalFields(!showAdditionalFields);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input required={"required"} type={"email"} value={email} onChange={(e) => setEmail(e.target.value)}
                       placeholder="Enter your email" />
                {showAdditionalFields && (
                    <>
                        <input
                            type={"text"}
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Enter your first name"
                        />
                        <input
                            type={"text"}
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Enter your last name"
                        />
                        <input
                            type={"text"}
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Enter your city"
                        />
                    </>
                )}
                <button type="submit">Subscribe</button>
            </form>
            <button onClick={toggleAdditionalFields}>
                {showAdditionalFields ? "Hide additional info" : "Add more info"}
            </button>
        </>
    );
}

export default Subscriber