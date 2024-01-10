import {useInfrastructureQuery} from '../../services/api.js';
import MapComponent from "../../components/Common/MapComponent.jsx";
import './InfrastructureBlock.scss';
import {Link} from "react-router-dom";
import useLanguagePrefix from "../../services/languagePrefix.jsx";

export default function InfrastructureBlock() {
    const {data} = useInfrastructureQuery({endpoint: `block_1`});
    const languagePrefix = useLanguagePrefix();
    return (
        <div className="infrastructure-block">
            <h3 className="infrastructure-block__title title"><Link
                to={`/${languagePrefix}/infrastructure`}>{data?.meta?.title}</Link></h3>
            <div className="infrastructure-block__map">
                <MapComponent
                    containerStyle={{width: '100%', height: '100%'}}
                    address={data?.data?.[0]?.attributes?.field_location}
                />
            </div>
        </div>
    );

}
