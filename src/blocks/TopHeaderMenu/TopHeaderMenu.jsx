import {useTopHeaderMenuQuery} from "../../services/api.js";
import './TopHeaderMenu.scss';
import {useContext, useEffect} from "react";
import {LoadingContext} from "../../context/loading-context.jsx";
export default function TopHeaderMenu(){
    const { data, isFetching } = useTopHeaderMenuQuery();
    const {setLoadingValue} = useContext(LoadingContext)
    // useEffect(() => {
    //     if(!isFetching){setLoadingValue({ TopHeaderMenu: true });} else { setLoadingValue({ TopHeaderMenu: false } )}
    // }, [isFetching]);
    return <div className="second-menu">
        <ul>
            {data?.data?.map(item => (
                <li key={item?.id}>
                    <a href={item?.attributes?.url}>{item?.attributes?.title}</a>
                </li>
            ))}
        </ul>
    </div>
}