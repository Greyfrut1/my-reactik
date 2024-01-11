import queryString from "query-string";

export default function Blocks({render}) {
    const search = window.location.search;
    const parsed = queryString.parse(search);

    const date = parsed.date;
    const category = parsed.category || 'All';

    return <>
        {first_block}
        {second_block}
        </>;
}
