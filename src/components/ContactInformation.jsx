import PropTypes from "prop-types";
import React from "react";


function ContactInformation({data,type}) {
    return (
        <div className={"contacts"}>
            <div className={"contacts-item"}>
                {type === "node" && (
                    <>
                        {data?.field_location?.length > 0 && (
                            <a className="contacts-item__location"
                               href={`https://www.google.com.ua/maps/search/${data?.field_location?.[0]?.value}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                     className="w-6 h-6">
                                    <path fillRule="evenodd"
                                          d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                                          clipRule="evenodd"/>
                                </svg>
                                {data?.field_location?.[0]?.value}
                            </a>
                        )}
                    </>
                )}
                {type === "views" && (
                    <>
                        {data?.field_location?.length > 0 && (
                            <a className="contacts-item__location"
                               href={`https://www.google.com.ua/maps/search/${data?.field_location}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                     className="w-6 h-6">
                                    <path fillRule="evenodd"
                                          d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                                          clipRule="evenodd"/>
                                </svg>
                                {data?.field_location}
                            </a>
                        )}
                    </>
                )}
            </div>
            <div className={"contacts-item"}>
                {type === "node" && (
                    <>
                        {data?.field_phone?.map((item, index) => (
                            <div key={index}>
                                <a className="contacts-item__phone" href={`tel:${item.value}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                         fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd"
                                              d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                                              clipRule="evenodd"/>
                                    </svg>
                                    {item.value}
                                </a>
                            </div>
                        ))}
                    </>
                )}
                {type === "views" && (
                    <>
                        {data?.field_phone?.length > 0 && (
                            <a className="contacts-item__phone" href={`tel:${data?.field_phone}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                     className="w-6 h-6">
                                    <path fillRule="evenodd"
                                          d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                                          clipRule="evenodd"/>
                                </svg>
                                {data?.field_phone}
                            </a>
                        )}
                    </>
                )}
            </div>
            <div className={"contacts-item"}>
                {type === "node" && (
                    <>
                        {data?.field_mail?.map((item, index) => (
                            <div key={index}>
                                <a className="contacts-item__mail" href={`mailto:${item.value}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                         fill="currentColor" className="w-6 h-6">
                                        <path
                                            d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"/>
                                        <path
                                            d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"/>
                                    </svg>
                                    {item.value}
                                </a>
                            </div>
                        ))}
                    </>
                )}
                {type === "views" && (
                    <>
                        {data?.field_mail?.length > 0 && (
                            <a className="contacts-item__mail"
                               href={`mailto:${data?.field_mail}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                     className="w-6 h-6">
                                    <path
                                        d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"/>
                                    <path
                                        d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"/>
                                </svg>
                                {data?.field_mail}
                            </a>
                        )}
                    </>
                )}
            </div>
            <div className={"contacts-item"}>
                {type === "node" && (
                    <>
                        {data?.field_wiki?.map((item, index) => (
                            <div key={index}>
                                <a className="contacts-item__wiki" href={item.uri}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                         fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd"
                                              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                              clipRule="evenodd"/>
                                    </svg>
                                    WIKI
                                </a>
                            </div>
                        ))}
                    </>
                )}
                {type === "views" && (
                    <>
                        {data?.field_wiki?.length > 0 && (
                            <a className="contacts-item__wiki"
                               href={data?.field_wiki.uri}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                     className="w-6 h-6">
                                    <path fillRule="evenodd"
                                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                          clipRule="evenodd"/>
                                </svg>
                                WIKI
                            </a>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

ContactInformation.propTypes = {
    data: PropTypes.oneOfType([
        PropTypes.object.isRequired,
        PropTypes.array.isRequired,
    ]),
    type: PropTypes.string.isRequired,
};

export default ContactInformation;