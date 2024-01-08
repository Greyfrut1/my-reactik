import { useInfrastructureQuery } from '../../services/api.js';
import InfrastructureView from "../../views/InfrastructureView/InfrastructureView.jsx";

export default function InfrastructureBlock() {
    const { data } = useInfrastructureQuery({endpoint: `block_1`});

    return <InfrastructureView infrastructureData={data} title={<h3 className="infrastructure-block__title"><a
                                    href='#'>{data?.meta.title}</a></h3>} />;
}
