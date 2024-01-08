import ContactInformation from "../../components/Common/ContactInformation.jsx";
import MapComponent from "../../components/Common/MapComponent.jsx";
import './InfrastructureView.scss';

export default function InfrastructureView({title, bottom, infrastructureData}) {
    return (
        <div className={"container"}>
            <div className={"infrastructure"}>
                <h3 className="infrastructure__title">{title}</h3>
                <div className="infrastructure-view md:gap-10 gap-20">
                    {infrastructureData?.data?.map((item, index) => (
                        <div key={index} className={"infrastructure-item"}>
                            <div className={"infrastructure-item__map"}>
                                <MapComponent
                                    containerStyle={{width: '100%', height: '100%'}}
                                    address={item?.attributes?.field_location}
                                />
                            </div>
                            <div className={"infrastructure-item__info"}>
                                <h2 className={"infrastructure-item__info-title"}><a
                                    href={`/${languagePrefix}${item?.attributes?.path?.alias}`}>{item.attributes.title}</a>
                                </h2>
                                <ContactInformation data={item.attributes} type={"views"}/>
                            </div>
                        </div>
                    ))}
                </div>
                {bottom}
            </div>
        </div>
    );
}
