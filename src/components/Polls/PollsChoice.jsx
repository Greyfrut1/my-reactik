import {usePollChoiceBlockQuery} from "../../services/api.js";
import PropTypes from "prop-types";

const PollsChoice = ({ choiceId }) => {

    const { data: choiceData } = usePollChoiceBlockQuery({ id: `${choiceId}` });

    return(
        <>
            {choiceData?.data?.attributes?.choice}
        </>
    )

};

PollsChoice.propTypes = {
    choiceId: PropTypes.string.isRequired
}
export default PollsChoice;