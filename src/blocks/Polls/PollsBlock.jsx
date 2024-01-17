import {usePollResultBlockQuery,
    usePollBlockQuery,} from "../../services/api.js";
import Polls from '../../components/Polls/Polls.jsx';
import { Link } from 'react-router-dom';
import './PollsBlock.scss';
import {useContext, useEffect} from "react";
import {LoadingContext} from "../../context/loading-context.jsx";

export default function PollsBlock() {
    const { data:  pollBlockData, isFetching: blockFetch} = usePollBlockQuery();
    const { data:  pollResultData, isFetching: resultFetch } = usePollResultBlockQuery();
    const {setLoadingValue} = useContext(LoadingContext)
    useEffect(() => {
        if(!blockFetch || resultFetch){setLoadingValue({ PollsBlock: true });} else { setLoadingValue({ PollsBlock: false } )}
    }, [blockFetch, resultFetch]);
    return (
        <div className="poll-block">
           <h3 className="poll-block__title"><a href='/'>{pollBlockData?.meta?.title}</a></h3>
           <Polls pollData={pollBlockData} resultData={pollResultData}/>
        </div>
    );
}