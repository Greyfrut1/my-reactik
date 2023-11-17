// Import necessary dependencies and components for the DynamicDataBlocks component.
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import useDrupalData from "../services/api.jsx";
import CalendarFilter from "../components/CalendarFilter.jsx";
import TypeFilterButtons from "../components/TypeFilterButtons.jsx";
import queryString from 'query-string';
import Pager from "./Pager.jsx";
import PropTypes from "prop-types";

// Define the DynamicDataBlocks component that takes type, endpoint, and render as props.
function DynamicDataBlocks({type, endpoint, render}) {
    // Access the navigation function from react-router-dom.
    const navigate = useNavigate();

    // Parse the query parameters from the URL.
    const search = window.location.search;
    const parsed = queryString.parse(search);

    // Extract date and category parameters or set defaults.
    const date = parsed.date;
    const category = parsed.category || 'All';

    // State variables for type information, selected date, and current page.
    const [typeInformation, setTypeInformation] = useState('All');
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    // Function to handle page changes.
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    // Function to format a date into a long format (YYYY-MM-DD).
    const formatLongDate = (locale, date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Function to handle changes in type information.
    const handleTypeInformation = (type) => {
        setTypeInformation(type);
        navigate({
            // Update URL search parameters based on type and selected date.
            search: `?category=${type}${selectedDate ? `&date=${formatLongDate(null, selectedDate)}` : ''}`,
        });
    };

    // Function to handle changes in selected date.
    const handleDateChange = (date) => {
        setSelectedDate(date);
        const formattedDate = date ? formatLongDate(null, date) : null;
        navigate({
            // Update URL search parameters based on type information and formatted date.
            search: `?${typeInformation ? `category=${typeInformation}&` : ''}date=${formattedDate}`,
        });
    };

    // Fetch data using useDrupalData hook with the specified endpoint, date, category, and current page.
    const {data} = useDrupalData(endpoint(date, category, currentPage));

    // Calculate total count, items per page, and total pages.
    const totalCount = data?.meta?.pager?.count || 0;
    const itemsPerPage = data?.meta?.pager?.configurations?.items_per_page || 1;
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    // Render the DynamicDataBlocks component with TypeFilterButtons, CalendarFilter, data items, and Pager.
    return (
        <div className={"container"}>
            <div className={""}>
                {type === 'news' ? <h1 className={"block-title"}>News</h1> : <h1 className={"block-title"}>Events</h1>}
            </div>
            <div className={"wrapper-dynamic-data-blocks gap-[30px] block lg:flex"}>
                <div className={"dynamic-data-blocks__left  view-content"}>
                    {/*
                        Map over the data items using the render function.
                        For each item in the data array, call the render function with the item and index.
                    */}
                    {data?.data?.length ? (
                        data?.data?.map((item, index) => render(item, index))
                    ) : (
                        <h1>Empty</h1>
                    )}
                </div>
                <div className={"dynamic-data-blocks__right lg:block hidden"}>
                    {/* Render CalendarFilter with selectedDate and a callback function for date changes. */}
                    <CalendarFilter selectedDate={selectedDate} onDateChange={handleDateChange}/>
                    {/* Render TypeFilterButtons with a callback function for type information changes. */}
                    <TypeFilterButtons handleTypeInformation={handleTypeInformation}/>
                </div>
            </div>
            {/*
                Render Pager component only if there are more than 1 total pages.
                Pass total pages and a callback function for page changes to the Pager component.
                */}
            {totalPages > 1 && (
                <div className={"pager flex justify-center mt-[20px]"}>

                    <Pager totalPages={totalPages} onPageChange={handlePageChange}/>
                </div>

            )}
        </div>
    );
}

// PropTypes block to define the expected types for props
DynamicDataBlocks.propTypes = {
    type: PropTypes.string.isRequired,
    endpoint: PropTypes.func.isRequired,
    render: PropTypes.func.isRequired,
};

// Export the DynamicDataBlocks component for use in other parts of the application.
export default DynamicDataBlocks;
