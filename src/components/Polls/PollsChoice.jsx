import {usePollChoiceBlockQuery} from "../../services/api.js";
import PropTypes from "prop-types";

// Functional component for rendering a choice based on the choiceId
const PollsChoice = ({ choiceId }) => {

    const { data: choiceData } = usePollChoiceBlockQuery({ id: `${choiceId}` });

    return(
        <div>
            {choiceData?.data?.attributes?.choice}
        </div>
    )

};

PollsChoice.propTypes = {
    choiceId: PropTypes.string.isRequired
}
export default PollsChoice;