import useDrupalData from "../services/api.jsx";

function TopHeaderMenu(){
    const { data: data } = useDrupalData(`jsonapi/menu_items/top-header`);
    return <ul className="second-menu">
        {data?.data?.map(item => (
            <li key={item?.id}>
                <a href={item?.attributes?.url}>{item?.attributes?.title}</a>
            </li>
        ))}
    </ul>
}

export default TopHeaderMenu