import useDrupalData from "../services/api.jsx";
import PropTypes from "prop-types";
import ImageComponent from "./ImageComponent.jsx";

function Paragraph({target_id}) {
    const {data: paragraph} = useDrupalData(`entity/paragraph/${target_id}`)
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
                         dangerouslySetInnerHTML={{__html: paragraph?.field_body?.[0]?.processed}}/>
                    <div style={{clear: 'both'}}></div>
                </>
            )}
            {paragraph?.type?.[0].target_id == 'file' && (
                <>
                    {paragraph?.field_file.map((file, index) => (
                        <a key={index} href={file.url} target={"_blank"} rel={"noopener noreferrer"}>
                            {file.description}
                        </a>
                    ))}
                </>
            )}
            {paragraph?.type?.[0].target_id == 'link' && (
                <>
                    {paragraph?.field_link.map((link, index) => (
                        <a key={index} href={link.full_url}>{link.title}</a>
                    ))}
                </>
            )}
            {paragraph?.type?.[0].target_id == 'image_link' && (
                <>
                    <a href={paragraph?.field_link_to_partner?.[0].uri}><ImageComponent alt={paragraph?.field_image?.[0].alt} url={paragraph?.field_image?.[0].target_id} imagestyle={'actual_news'} /></a>
                </>
            )}
        </>
    );
}

Paragraph.propTypes = {
    target_id: PropTypes.number.isRequired,
};
export default Paragraph