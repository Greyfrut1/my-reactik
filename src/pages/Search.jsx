import {useParams} from "react-router-dom";
import useDrupalData from "../services/api.jsx";

function Search(){

    const { result } = useParams();
    // console.log(result)
    const {data: search} = useDrupalData(`search?search_api_fulltext=${result}`)
    console.log(search)

    return(
        <>
            <form>
                <input className={"enter"} type="text" />
                <button type="submit">Submit</button>
            </form>
            {search?.rows?.map((item, index) => (
                <div key={index}>
                    <div dangerouslySetInnerHTML={{__html: item?.title}} />
                    <div dangerouslySetInnerHTML={{__html: item?.search_api_excerpt}} />
                </div>
            ))}
        </>
    );
}
export default Search