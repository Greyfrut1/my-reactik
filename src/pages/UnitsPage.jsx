import {useBranchesQuery} from "../services/api.js";
import BranchesView from "../views/BranchesView/BranchesView.jsx";
import {useContext, useEffect} from "react";
import {LoadingContext} from "../context/loading-context.jsx";

export default function UnitsPage(){
    const {data, isFetching} = useBranchesQuery({endpoint: `page_1`});
    const {setLoadingValue} = useContext(LoadingContext)
    useEffect(() => {
        if(!isFetching){setLoadingValue({ UnitsPage: true });} else { setLoadingValue({ UnitsPage: false } )}
    }, [isFetching]);
    return(
        <BranchesView data={data}/>
    )
}