import {useBranchesQuery} from "../services/api.js";
import BranchesView from "../views/BranchesView/BranchesView.jsx";

export default function MuseumsPage() {
    const {data} = useBranchesQuery({endpoint: `page_2`});

    return (
        <BranchesView data={data}/>
    )
}