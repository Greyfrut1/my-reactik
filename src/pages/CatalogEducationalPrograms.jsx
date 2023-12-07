import React, {useState, useEffect} from 'react';
import useDrupalData from "../services/api.jsx";
import ExposedFilterCatalog from "../components/ExposedFilterCatalog.jsx";
import EntityTitle from "../components/EntityTitle.jsx";
import useLanguagePrefix from "../services/languagePrefix.jsx";

// Functional component for rendering a catalog of educational programs
function CatalogEducationalPrograms() {

    // State for storing filter values and language prefix
    const [filterValues, setFilterValues] = useState({
        title: '',
        field_form_educations_value: 'All',
        field_educational_level_target_id: 'All',
        field_validity_value: 'All',
        field_faculty_target_id: 'All',
    });
    const languagePrefix = useLanguagePrefix();
    const [submitClicked, setSubmitClicked] = useState(false);

    // Function to build the API URL based on filter values
    const buildApiUrl = () => {
        return `/all-educations?views-filter[title]=${filterValues.title}&views-filter[field_form_educations_value]=${filterValues.field_form_educations_value}&views-filter[field_educational_level_target_id]=${filterValues.field_educational_level_target_id}&views-filter[field_validity_value]=${filterValues.field_validity_value}&views-filter[field_faculty_target_id]=${filterValues.field_faculty_target_id}`;
    };

    // Custom hook for fetching Drupal data based on the API URL
    const {data: educationalProgramsData, fetchData} = useDrupalData(buildApiUrl());

    // Effect to refetch data when the submit button is clicked
    useEffect(() => {
        if (submitClicked) {
            fetchData();
            setSubmitClicked(false);
        }
    }, [buildApiUrl(), submitClicked, fetchData]);

    // Handler for updating filter values
    const handleFilterChange = (filter) => {
        setFilterValues(filter);
    };

    // Rendering the catalog of educational programs
    return (
        <>
            <ExposedFilterCatalog onFilterChange={handleFilterChange}/>
            <table>
                <thead>
                <tr>
                    <th>{(languagePrefix === "en" && "Title") || ("Назва освітньої програми")}</th>
                    <th>{(languagePrefix === "en" && "Form of study") || ("Форма навчання")}</th>
                    <th>{(languagePrefix === "en" && "Educational level") || ("Освітній рівень")}</th>
                    <th>{(languagePrefix === "en" && "Faculty") || ("Факультет")}</th>
                </tr>
                </thead>
                <tbody>
                {educationalProgramsData?.rows?.map((item, index) => (
                    <tr key={index}>
                        <td dangerouslySetInnerHTML={{__html: item?.title}} />
                        <td>{item?.field_form_educations}</td>
                        <td dangerouslySetInnerHTML={{__html: item?.field_educational_level}} />
                        <td dangerouslySetInnerHTML={{__html: item?.field_faculty}}/>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}

export default CatalogEducationalPrograms;
