import useDrupalData from "../services/api.jsx";

// eslint-disable-next-line react/prop-types
const ChoiceComponent = ({ choiceId }) => {
    console.log(choiceId)

    const { data: choiceData, isLoading: isChoiceLoading, error: choiceError } = useDrupalData(`/jsonapi/poll_choice/poll_choice/${choiceId}`);

    return(
        <div>
            {choiceData?.data?.attributes?.choice}
        </div>
    )

};

export default ChoiceComponent;