import ContactInformation from "../../components/Common/ContactInformation.jsx";
import MapComponent from "../../components/Common/MapComponent.jsx";
import './InfrastructureView.scss';
import {useInfrastructureQuery} from "../../services/api.js";
import useLanguagePrefix from "../../services/languagePrefix.jsx";
import {useContext, useEffect} from "react";
import {LoadingContext} from "../../context/loading-context.jsx";

export default function InfrastructureView() {
    const { data, isFetching } = useInfrastructureQuery({endpoint: `page_1`});
    const languagePrefix = useLanguagePrefix();
    const {setLoadingValue} = useContext(LoadingContext)
    useEffect(() => {
        if(!isFetching){setLoadingValue({ InfrastructureView: true });} else { setLoadingValue({ InfrastructureView: false } )}
    }, [isFetching]);
    return (
        <div className={"container"}>
            <div className={"infrastructure"}>
                <h3 className="infrastructure__title">{data?.meta?.title}</h3>
                <div className="infrastructure-view md:gap-10 gap-20">
                    {data?.data?.map((item, index) => (
                        <div key={index} className={"infrastructure-item"}>
                            <div className={"infrastructure-item__map"}>
                                <MapComponent
                                    containerStyle={{width: '100%', height: '100%'}}
                                    address={item?.attributes?.field_location}
                                />
                            </div>
                            <div className={"infrastructure-item__info"}>
                                <h2 className={"infrastructure-item__info-title"}><a
                                    href={`/${languagePrefix}${item?.attributes?.path?.alias}`}>{item?.attributes?.title}</a>
                                </h2>
                                <ContactInformation data={item.attributes} type={"views"}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
