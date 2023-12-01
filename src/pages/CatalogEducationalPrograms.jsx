import React, {useState, useEffect} from 'react';
import useDrupalData from "../services/api.jsx";
import ExposedFilterCatalog from "../components/ExposedFilterCatalog.jsx";
import EntityTitle from "../components/EntityTitle.jsx";
import useLanguagePrefix from "../services/languagePrefix.jsx";

function CatalogEducationalPrograms() {
    const [filterValues, setFilterValues] = useState({
        title: '',
        field_form_educations_value: 'All',
        field_educational_level_target_id: 'All',
        field_validity_value: 'All',
        field_faculty_target_id: 'All',
    });
    const languagePrefix = useLanguagePrefix();
    const [submitClicked, setSubmitClicked] = useState(false);

    const buildApiUrl = () => {
        return `/jsonapi/views/satalog_of_educational_programs/block_1?views-filter[title]=${filterValues.title}&views-filter[field_form_educations_value]=${filterValues.field_form_educations_value}&views-filter[field_educational_level_target_id]=${filterValues.field_educational_level_target_id}&views-filter[field_validity_value]=${filterValues.field_validity_value}&views-filter[field_faculty_target_id]=${filterValues.field_faculty_target_id}`;
    };

    const {data: educationalProgramsData, fetchData} = useDrupalData(buildApiUrl());

    useEffect(() => {
        if (submitClicked) {
            fetchData();
            setSubmitClicked(false);
        }
    }, [buildApiUrl(), submitClicked, fetchData]);

    const handleFilterChange = (filter) => {
        setFilterValues(filter);
    };


    return (
        <>
            <ExposedFilterCatalog onFilterChange={handleFilterChange}/>
            <table>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Form of study</th>
                    <th>Educational level</th>
                    <th>Faculty</th>
                </tr>
                </thead>
                <tbody>
                {educationalProgramsData?.data?.map((item) => (
                    <tr key={item.id}>
                        <td><a href={`/${languagePrefix}${item?.attributes?.path?.alias}`}>{item?.attributes?.title}</a></td>
                        <td>{item?.attributes?.field_form_educations}</td>
                        <td><EntityTitle
                            endpoint={`/taxonomy_term/educational_level/${item?.relationships?.field_educational_level?.data?.id}`}/>
                        </td>
                        <td><EntityTitle endpoint={`/node/faculty/${item?.relationships?.field_faculty?.data?.id}`}/>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}

export default CatalogEducationalPrograms;
