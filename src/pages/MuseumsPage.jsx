import {useBranchesQuery} from "../services/api.js";
import BranchesView from "../views/BranchesView/BranchesView.jsx";
import {useContext, useEffect} from "react";
import {LoadingContext} from "../context/loading-context.jsx";

export default function MuseumsPage() {
    const {data, isFetching} = useBranchesQuery({endpoint: `page_2`});
    const {setLoadingValue} = useContext(LoadingContext)
    useEffect(() => {
        if(!isFetching){setLoadingValue({ MuseumsPage: true });} else { setLoadingValue({ MuseumsPage: false } )}
    }, [isFetching]);
    return (
        <BranchesView data={data}/>
    )
}