import useDrupalData from "../services/api.jsx";
import {useState} from "react";
import Pagination from '@mui/material/Pagination';
import {PaginationItem} from "@mui/material";
// Custom SVG components
const CustomPreviousIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
        />
    </svg>
);
const CustomNextIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none" viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
);
const CustomFirstIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
        />
    </svg>
);
const CustomLastIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
        />
    </svg>
);
function Pager({ totalPages, onPageChange }){
    const [page, setPage] = useState(0);
    // const totalPages = testData?.pager?.total_pages;
    // const totalPages = 10;
    const handlePageChange = (event, newPage) => {
        setPage(newPage - 1);
        onPageChange(newPage - 1)
    };
    return(
        <>
            <Pagination
                page={page + 1}
                shape="rounded"
                count={totalPages}
                showFirstButton
                showLastButton
                onChange={handlePageChange}
                renderItem={(item) => (
                    <PaginationItem
                        slots={{ previous: CustomPreviousIcon, next: CustomNextIcon, first:CustomFirstIcon, last:CustomLastIcon }}
                        {...item}
                    />
                )}
            />
        </>
    );
}
export default Pager