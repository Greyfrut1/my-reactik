import {useBranchesQuery} from "../services/api.js";
import BranchesView from "../views/BranchesView/BranchesView.jsx";

export default function UnitsPage(){
    const {data} = useBranchesQuery({endpoint: `page_1`});
    return(
        <BranchesView data={data}/>
    )
}