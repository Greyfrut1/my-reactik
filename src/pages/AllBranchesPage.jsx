import {useBranchesQuery} from "../services/api.js";
import BranchesView from "../views/BranchesView/BranchesView.jsx";
import {useContext, useEffect} from "react";
import {LoadingContext} from "../context/loading-context.jsx";

export default function Branches(){
    const {data, isFetching} = useBranchesQuery({endpoint: `page_3`});
    const {setLoadingValue} = useContext(LoadingContext)
    useEffect(() => {
        if(!isFetching){setLoadingValue({ Branches: true });} else { setLoadingValue({ Branches: false } )}
    }, [isFetching]);
    return(
        <BranchesView data={data}/>
    )
}