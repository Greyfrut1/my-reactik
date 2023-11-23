import React, {useState} from 'react';
import useDrupalData from "../services/api.jsx";

function ExposedFilterCatalog({ onFilterChange }) {
    const {data: educationsViewData} = useDrupalData(`/all-educations`)
    const [formValues, setFormValues] = useState({
        title: '',
        field_form_educations_value: 'All',
        field_educational_level_target_id: 'All',
        field_validity_value: 'All',
        field_faculty_target_id: 'All',
    });
    const handleInputChange = (fieldName, value) => {
        setFormValues((prevValues) => ({ ...prevValues, [fieldName]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilterChange(formValues);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Form Educations:
                    <input type="text" onChange={(e) => handleInputChange('title', e.target.value)}/>
                </label>
                <label>
                    Form Educations:
                    <select
                        onChange={(e) => handleInputChange('field_form_educations_value', e.target.value)}
                    >
                        <option value="All">All</option>
                        {educationsViewData?.exposed_filters?.[1]?.options &&
                            Object.entries(educationsViewData.exposed_filters[1].options).map(([key, value]) => (
                                <option key={key} value={key}>{value}</option>
                            ))}
                        {/* Додайте інші значення, які може мати це поле */}
                    </select>
                </label>

                <label>
                    Educational Level:
                    <select
                        onChange={(e) => handleInputChange('field_educational_level_target_id', e.target.value)}
                    >
                        <option value="All">All</option>
                        {educationsViewData?.exposed_filters?.[1]?.options &&
                            Object.entries(educationsViewData.exposed_filters[2].options).map(([key, value]) => (
                                <option key={key} value={key}>{value}</option>
                            ))}

                        {/* Додайте інші значення, які може мати це поле */}
                    </select>
                </label>

                <label>
                    Validity:
                    <select
                        onChange={(e) => handleInputChange('field_validity_value', e.target.value)}
                    >
                        <option value="All">All</option>
                        {educationsViewData?.exposed_filters?.[1]?.options &&
                            Object.entries(educationsViewData.exposed_filters[3].options).map(([key, value]) => (
                                <option key={key} value={key}>{value}</option>
                            ))}
                        {/* Додайте інші значення, які може мати це поле */}
                    </select>
                </label>

                <label>
                    Faculty:
                    <select
                        onChange={(e) => handleInputChange('field_faculty_target_id', e.target.value)}
                    >
                        <option value="All">All</option>
                        {educationsViewData?.exposed_filters?.[1]?.options &&
                            Object.entries(educationsViewData.exposed_filters[4].options).map(([key, value]) => (
                                <option key={key} value={key}>{value}</option>
                            ))}

                        {/* Додайте інші значення, які може мати це поле */}
                    </select>
                </label>

                <button type="submit">Search</button>
            </form>
        </div>
    );
}

export default ExposedFilterCatalog;
