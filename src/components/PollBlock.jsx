import ChoiceComponent from "./ChoiceComponent.jsx";
import React, {useEffect, useState} from "react";
import axios from "axios";

function PollBlock({pollData, resultData}) {
    const [ip, setIP] = useState("");
    const [showForm1, setShowForm1] = useState(true);
    const handleButtonClick = () => {
        setShowForm1(!showForm1); // Перемикач форм
    };

    const totalVotes = resultData?.data?.reduce((acc, choice) => acc + parseInt(choice?.attributes?.vote_count, 10), 0);

    const getData = async () => {
        const res = await axios.get("https://api.ipify.org/?format=json");
        console.log(res.data);
        setIP(res.data.ip);
    };

    useEffect(() => {
        //passing getData method to the lifecycle method
        getData();
    }, []);


    const handleSubmit1 = (event) => {

        event.preventDefault(); // Prevent the default form submission behavior

        const formData = new FormData(event.target);
        const selectedValue = formData.get('choice');
        const pollId = formData.get('pollId');
        const currentTimestamp = new Date().getTime();


        const submitFormData = {
            chid: selectedValue,
            pid: pollId,
            uid: "0",
            hostname: ip,
            timestamp: Math.floor(currentTimestamp / 1000).toString(),
        };
        console.log(submitFormData)

        axios.post('http://128.140.43.32/poll-vote/post-data', submitFormData)
            .then((response) => {
                console.log(response.data, response);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div>
            {pollData?.data?.map((poll) => (
                <div key='test'>
                    <div>{poll?.attributes?.question}</div>
                    {showForm1 ? (
                        <form onSubmit={handleSubmit1}>
                            <input type="hidden" name="pollId" value={poll?.attributes?.drupal_internal__id}/>
                            {poll?.relationships?.choice?.data?.map((choice, index) => (
                                <div key={choice.id}>
                                    <input
                                        type="radio"
                                        name="choice"  // Add a name attribute to group the radio inputs
                                        value={choice?.meta?.drupal_internal__target_id}
                                    />
                                    <label><ChoiceComponent
                                        choiceId={poll.relationships?.choice?.data?.[index]?.id}/></label>
                                </div>
                            ))}
                            <button type="submit">Надіслати</button>
                            <button onClick={handleButtonClick}>Переглянути результати</button>
                        </form>
                    ) : (
                        <div>
                            {resultData?.data?.map((choice1, index) => {
                                return (
                                    <div key={index}>
                                        <ChoiceComponent
                                            choiceId={pollData?.data?.[0]?.relationships?.choice?.data?.[index]?.id}/>
                                        {/* Display the percentage */}
                                        {totalVotes > 0 && (
                                            <>
                                                {((choice1?.attributes?.vote_count / totalVotes) * 100).toFixed(0)}%{' '}
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="100"
                                                    value={((choice1?.attributes?.vote_count / totalVotes) * 100).toFixed(0)}
                                                    disabled
                                                />
                                                ({choice1?.attributes?.vote_count} vote{choice1?.attributes?.vote_count !== 1 ? 's' : ''})
                                            </>
                                        )}
                                    </div>
                                )
                            })}
                            <div>Total votes: {totalVotes}</div>
                            <button onClick={handleButtonClick}>Переглянути опитування</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default PollBlock