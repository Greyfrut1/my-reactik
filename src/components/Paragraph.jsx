import useDrupalData from "../services/api.jsx";

function Paragraph({target_id}) {
    const {data: paragraph} = useDrupalData(`entity/paragraph/${target_id}`)
    console.log(paragraph)
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
                    <div className={"file"}>{paragraph?.field_file?.[0]?.description}</div>
                    <div className={"file"}>{paragraph?.field_file?.[0]?.url}</div>
                </>
            )}
            {paragraph?.type?.[0].target_id == 'link' && (
                <>
                    {paragraph?.field_link.map((link,index) => (
                        <a key={index} href={link.uri}>{link.title}</a>
                    ))}
                    {/*<div className={"link"}><a href={paragraph?.field_link?.[0]?.uri}>{paragraph?.field_link?.[0]?.title}</a></div>*/}
                </>
            )}
        </>
    );
}

export default Paragraph