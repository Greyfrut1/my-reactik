import {useParagraphQuery} from "../../services/api.js";
import PropTypes from "prop-types";
import {useContext, useEffect, useState} from "react";
import dropdownArrow from "/src/assets/dropdown-arrow.png"
import YoutubeEmbed from "../Common/YoutubeEmbed.jsx";
import './Paragraph.scss';
import {Link} from "react-router-dom";
import {LoadingContext} from "../../context/loading-context.jsx";

function Paragraph({target_id}) {
    const {data: paragraph, isFetching} = useParagraphQuery({targetId: `${target_id}`});
    const {setLoadingValue} = useContext(LoadingContext)
    useEffect(() => {
        if(!isFetching){setLoadingValue({ Paragraph: true });} else { setLoadingValue({ Paragraph: false } )}
    }, [isFetching]);
    const [isActive, setIsActive] = useState(false);

    const [isActiveDropdown, setisActiveDropdown] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
    };

    const handleClickDropdown = () => {
        setisActiveDropdown(!isActiveDropdown);
    };
    return (
        <>
            {paragraph?.type?.[0]?.target_id === 'section' && (
                <div
                    className={`section-wrapper`}
                >
                    <div onClick={handleClick} className={`section ${isActive ? 'open' : ''}`}>
                        <div className={`plus`}></div>
                        <div className={"section-title"}>{paragraph?.field_title?.[0]?.value}</div>
                    </div>
                    {paragraph?.field_subsection?.length > 0 && (
                        <div className={`subsection-wrapper ${isActive ? 'subsection-wrapper-active' : ''}`}>
                            {paragraph?.field_subsection?.map((item, index) => (
                                <div key={index} className={`subsection-item`}>
                                    <Paragraph target_id={item?.target_id}/>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            )}
            {paragraph?.type?.[0]?.target_id == 'dropdown' && (
                <>
                    <div onClick={handleClickDropdown} className={"dropdown"}>
                        <div className={`dropdown-arrow ${isActiveDropdown ? 'dropdown-arrow-active' : ''}`}>
                            <img src={dropdownArrow} alt={"arrow"}/>
                        </div>
                        <div className={"dropdown-title"}>{paragraph?.field_title?.[0]?.value}</div>
                    </div>
                    {paragraph?.field_dropdown_info?.map((item, index) => (
                        <div key={index} className={`dropdown_info ${isActiveDropdown ? 'dropdown_info-active' : ''}`}>
                            <Paragraph target_id={item?.target_id}/>
                        </div>
                    ))}
                </>
            )}
            {paragraph?.type?.[0]?.target_id == 'document_body' && (
                <div className={"clearfix-document_body"}>
                    <div className={"document_body"}
                         dangerouslySetInnerHTML={{__html: paragraph?.field_body?.[0]?.processed}}/>
                    <div style={{clear: 'both'}}></div>
                </div>
            )}
            {paragraph?.type?.[0]?.target_id == 'file' && (
                <>
                    {paragraph?.field_file.map((file, index) => (
                        <div className={"dropdown-item"} key={index}>
                            <div className={`dropdown-arrow`}>
                                <img src={dropdownArrow} alt={"arrow"}/>
                            </div>
                            <Link to={file.url} target={"_blank"} rel={"noopener noreferrer"}>
                                {file.description}
                            </Link>
                        </div>

                    ))}
                </>
            )}
            {paragraph?.type?.[0]?.target_id == 'link' && (
                <>
                    {paragraph?.field_link.map((link, index) => (
                        <div className={"dropdown-item"} key={index}>
                            <div className={`dropdown-arrow`}>
                                <img src={dropdownArrow} alt={"arrow"}/>
                            </div>
                            <a href={index} hidden={link.full_url}>{link.title}</a>
                        </div>
                    ))}
                </>
            )
            }
            {paragraph?.type?.[0]?.target_id == 'youtube_link' && (
                <div className={"paragraphs-video"}>
                    {paragraph?.field_youtube_link?.map((link) => (
                        <YoutubeEmbed embedId={link?.uri}/>
                    ))}
                </div>
            )
            }
            {paragraph?.type?.[0]?.target_id == 'image_link' && (
                <a href={paragraph?.field_link_to_partner?.[0]?.uri}>
                    <img src={paragraph?.field_image?.url}
                         alt={paragraph?.field_image?.alt}/>
                </a>
            )
            }
            {paragraph?.type?.[0]?.target_id == 'file_preview' && (
                <>
                    {paragraph?.field_file?.length > 0 && paragraph?.field_file.map((file, index) => (
                        <div key={index}>
                            <iframe width={"100%"} height={"400px"}
                                    src={`https://docs.google.com/gview?embedded=true&url=${file?.url}`}/>
                            <div className={"gdoc-filename"}>{file?.description}</div>
                        </div>
                    ))}
                </>
            )}
        </>
    );
}

Paragraph.propTypes = {
    target_id: PropTypes.number.isRequired,
};
export default Paragraph