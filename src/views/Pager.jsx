import {useState} from "react";
import Pagination from '@mui/material/Pagination';
import {PaginationItem} from "@mui/material";
import PropTypes from "prop-types";

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
// Define the Pager component that takes 'totalPages' and 'onPageChange' as props.
export default function Pager({ totalPages, onPageChange }){
    const [page, setPage] = useState(0);

    // Function to handle page changes and call 'onPageChange' prop.
    const handlePageChange = (event, newPage) => {
        setPage(newPage - 1);
        onPageChange(newPage - 1)
    };

    // Render the Pager component with MUI Pagination and custom icons.
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

Pager.propTypes = {
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};
