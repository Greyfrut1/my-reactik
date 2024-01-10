import {useBranchesQuery} from "../services/api.js";
import BranchesView from "../views/BranchesView/BranchesView.jsx";

export default function Branches(){
    const {data} = useBranchesQuery({endpoint: `page_3`});
    return(
        <BranchesView data={data}/>
    )
}