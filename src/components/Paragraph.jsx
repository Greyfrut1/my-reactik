import useDrupalData from "../services/api.jsx";
import PropTypes from "prop-types";
import TitleTaxonomy from "./TitleTaxonomy.jsx";

function Paragraph({target_id}) {
    const {data: paragraph} = useDrupalData(`entity/paragraph/${target_id}`)
    if (paragraph?.type?.[0].target_id == 'link'){
        console.log(paragraph)
    }
    return (
        <>
            {paragraph?.type?.[0].target_id == 'section' && (
                <>
                    <div className={"section-title flex"}>
                        <div>{paragraph?.field_title?.[0].value}</div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                        </svg>
                    </div>
                    {paragraph?.field_subsection?.map((item, index) => (
                        <div key={index} className={"subsection"}>
                            <Paragraph target_id={item?.target_id}/>
                        </div>
                    ))}
                </>
            )}
            {paragraph?.type?.[0].target_id == 'dropdown' && (
                <>
                    <div className={"dropdown"}>
                        <div className={"dropdown_title flex"}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
                            </svg>
                            <div>{paragraph?.field_title?.[0].value}</div>
                        </div>
                        <div className={"dropdown_body"}
                             dangerouslySetInnerHTML={{__html: paragraph?.field_body?.[0]?.value}}/>
                    </div>
                    {paragraph?.field_dropdown_info?.map((item, index) => (
                        <div key={index} className={"dropdown_info"}>
                            <Paragraph target_id={item?.target_id}/>
                        </div>
                    ))}
                </>
            )}
            {paragraph?.type?.[0].target_id == 'document_body' && (
                <>
                    <div className={"document_body"}
                         dangerouslySetInnerHTML={{__html: paragraph?.field_body?.[0]?.value}}/>
                </>
            )}
            {paragraph?.type?.[0].target_id == 'file' && (
                <>
                    {paragraph?.field_file.map((file,index) => (
                        <a key={index} href={file.url} target={"_blank"} rel={"noopener noreferrer"}>
                            {file.description}
                        </a>
                    ))}
                </>
            )}
            {paragraph?.type?.[0].target_id == 'link' && (
                <>
                    {paragraph?.field_link.map((link,index) => (
                        <a key={index} href={link.full_url}>{link.title}</a>
                    ))}
                </>
            )}
            {paragraph?.type?.[0].target_id == 'main_educational_programs' && (
                <><td><TitleTaxonomy id={paragraph?.field_name_discipline?.[0].target_uuid} /></td><td><a href={paragraph?.field_document_main_discipline?.[0].url} target={"_blank"} rel={"noopener noreferrer"}>Силабус</a></td></>
            )}
            {paragraph?.type?.[0].target_id == 'elective_educational_disciplines' && (
                <><td>{paragraph?.field_title?.[0].value}</td><td><a href={paragraph?.field_doc_elective_discipline?.[0].url} target={"_blank"} rel={"noopener noreferrer"}>Силабус</a></td></>
            )}
        </>
    );
}
Paragraph.propTypes = {
    target_id: PropTypes.number.isRequired,
};
export default Paragraph