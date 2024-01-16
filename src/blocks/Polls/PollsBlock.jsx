import {usePollResultBlockQuery,
    usePollBlockQuery,} from "../../services/api.js";
import Polls from '../../components/Polls/Polls.jsx';
import { Link } from 'react-router-dom';
import './PollsBlock.scss';

export default function PollsBlock() {
    const { data:  pollBlockData } = usePollBlockQuery();
    const { data:  pollResultData } = usePollResultBlockQuery();
    return (
        <div className="poll-block">
           <h3 className="poll-block__title"><Link to='/'>{pollBlockData?.meta?.title}</Link></h3>
           <Polls pollData={pollBlockData} resultData={pollResultData}/>
        </div>
    );
}